-- =============================================================================
-- [COMPANY NAME] CONSTRUCTION & PROPERTY DEVELOPMENT PLATFORM
-- INITIAL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
-- Stores client & administrative accounts linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast role & email lookup
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 2. ENQUIRIES TABLE
-- Stores comprehensive construction & architectural requirement submissions
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Customer Contact Details (Captured at time of submission)
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  alternate_phone TEXT,
  
  -- Land & Plot Information
  owns_land BOOLEAN NOT NULL DEFAULT true,
  land_size NUMERIC,
  land_unit TEXT DEFAULT 'sq.ft',
  site_location TEXT,
  city TEXT,
  
  -- Construction Typology & Requirements
  building_type TEXT NOT NULL,
  number_of_floors INTEGER,
  built_up_area NUMERIC,
  bedrooms INTEGER,
  bathrooms INTEGER,
  parking_requirements TEXT,
  construction_style TEXT,
  special_requirements TEXT,
  
  -- Budget & Timeline Expectations
  estimated_budget TEXT,
  expected_start_date TEXT,
  expected_completion TEXT,
  additional_notes TEXT,
  
  -- Consultation Preferences
  preferred_contact_method TEXT DEFAULT 'whatsapp',
  preferred_contact_time TEXT,
  
  -- Administrative Lead Status
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'closed')),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for enquiry search, filtering, and sorting
CREATE INDEX IF NOT EXISTS idx_enquiries_user_id ON public.enquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_building_type ON public.enquiries(building_type);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_number ON public.enquiries(enquiry_number);

-- =============================================================================
-- AUTO-SYNC NEW AUTH USERS INTO PROFILES TABLE
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Valued Client'),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    'customer'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run whenever a user signs up via Supabase Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Helper security function: Check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- PROFILES POLICIES
-- -----------------------------------------------------------------------------
-- 1. Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- 2. Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- 3. Users can update their own profile details (excluding role)
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- 4. Admins can update any profile (including roles)
CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- ENQUIRIES POLICIES
-- -----------------------------------------------------------------------------
-- 1. Customers can view ONLY their own enquiries
CREATE POLICY "Customers can view own enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 2. Admins can view ALL enquiries
CREATE POLICY "Admins can view all enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- 3. Customers can insert enquiries associated with their own user_id
CREATE POLICY "Customers can insert own enquiries"
  ON public.enquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- 4. Admins can update enquiries (change status, notes)
CREATE POLICY "Admins can update enquiries"
  ON public.enquiries
  FOR UPDATE
  TO authenticated
  USING (public.is_admin());

-- =============================================================================
-- SECURE ADMIN PROVISIONING FUNCTION
-- Run via Supabase SQL Editor or controlled server migration to promote a user to admin
-- =============================================================================
CREATE OR REPLACE FUNCTION public.set_user_as_admin(target_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET role = 'admin', updated_at = NOW()
  WHERE email = target_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


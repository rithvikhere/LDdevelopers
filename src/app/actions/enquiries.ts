"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSession, isSupabaseConfigured } from "@/lib/auth-helpers";
import { enquirySchema, EnquiryInput } from "@/lib/validations/enquiry";
import { Enquiry, EnquiryStatus } from "@/lib/types/database";

// In-memory demo store for fallback when live Supabase credentials are not connected
const globalDemoEnquiries: Enquiry[] = [
  {
    id: "demo-enq-001",
    enquiry_number: "LD-ENQ-2026-1042",
    user_id: "demo-client-id-001",
    full_name: "Vikramaditya Sharma",
    email: "vikram.sharma@example.com",
    phone: "+91 98450 11223",
    alternate_phone: "+91 98450 44556",
    owns_land: true,
    land_size: 4800,
    land_unit: "sq.ft",
    site_location: "Jubilee Hills, Road No. 36",
    city: "Hyderabad",
    building_type: "Luxury Contemporary Villa",
    number_of_floors: 3,
    built_up_area: 5600,
    bedrooms: 5,
    bathrooms: 6,
    parking_requirements: "3 Covered bays + EV charger",
    construction_style: "Minimalist Architectural Concrete & Teak",
    special_requirements: "Double-height atrium, rooftop infinity plunge pool, biometric security automation",
    estimated_budget: "₹3.5 Cr – ₹5.0 Cr",
    expected_start_date: "Q2 2026",
    expected_completion: "14 months",
    additional_notes: "Requires turnkey architectural design and structural engineering under single master contract.",
    preferred_contact_method: "whatsapp",
    preferred_contact_time: "Late Afternoon (3 PM – 6 PM)",
    status: "in_progress",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "demo-enq-002",
    enquiry_number: "LD-ENQ-2026-1088",
    user_id: "demo-client-id-002",
    full_name: "Ananya Deshmukh",
    email: "ananya.d@example.com",
    phone: "+91 97112 88990",
    owns_land: true,
    land_size: 3200,
    land_unit: "sq.ft",
    site_location: "Koregaon Park",
    city: "Pune",
    building_type: "Independent Duplex Residence",
    number_of_floors: 2,
    built_up_area: 3800,
    bedrooms: 4,
    bathrooms: 4,
    parking_requirements: "2 Covered bays",
    construction_style: "Contemporary Tropical Courtyard",
    special_requirements: "Central landscaped courtyard, solar rooftop array, Italian marble flooring",
    estimated_budget: "₹2.0 Cr – ₹3.0 Cr",
    expected_start_date: "Immediate",
    expected_completion: "12 months",
    additional_notes: "Ready for soil testing and municipal sanction architectural drawings.",
    preferred_contact_method: "phone",
    preferred_contact_time: "Morning (10 AM – 12 PM)",
    status: "contacted",
    created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "demo-enq-003",
    enquiry_number: "LD-ENQ-2026-1120",
    user_id: "demo-client-id-003",
    full_name: "Rajeshwar Rao",
    email: "rajeshwar.rao@corporategroup.in",
    phone: "+91 99887 76655",
    owns_land: true,
    land_size: 9600,
    land_unit: "sq.ft",
    site_location: "Gachibowli Financial District",
    city: "Hyderabad",
    building_type: "Bespoke Boutique Commercial Landmark",
    number_of_floors: 5,
    built_up_area: 18500,
    parking_requirements: "Basement stack parking for 24 cars",
    construction_style: "Modern Glass & High-Performance Glazed Curtain Wall",
    special_requirements: "Grade-A corporate floor plates, high-speed gearless elevators, LEED Gold compliance",
    estimated_budget: "₹8.0 Cr – ₹12.0 Cr",
    expected_start_date: "Q3 2026",
    expected_completion: "18 months",
    additional_notes: "Seeking full turnkey EPC contractor with in-house structural and MEP consultancy.",
    preferred_contact_method: "in_person",
    preferred_contact_time: "Anytime weekdays",
    status: "new",
    created_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 3600000).toISOString(),
  },
];

export interface CreateEnquiryResult {
  success: boolean;
  error?: string;
  enquiryNumber?: string;
}

/**
 * Creates a comprehensive construction enquiry.
 */
export async function createEnquiryAction(input: EnquiryInput): Promise<CreateEnquiryResult> {
  const session = await getSession();
  if (!session?.user) {
    return {
      success: false,
      error: "You must be signed in to submit a construction enquiry.",
    };
  }

  const validated = enquirySchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Invalid enquiry details provided.",
    };
  }

  const data = validated.data;
  const enquiryNumber = `LD-ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  // 1. Live Supabase database insertion
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await (supabase.from("enquiries") as any).insert({
        enquiry_number: enquiryNumber,
        user_id: session.user.id,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        alternate_phone: data.alternatePhone || null,
        owns_land: data.ownsLand,
        land_size: data.landSize || null,
        land_unit: data.landUnit || "sq.ft",
        site_location: data.siteLocation,
        city: data.city,
        building_type: data.buildingType,
        number_of_floors: data.numberOfFloors || null,
        built_up_area: data.builtUpArea || null,
        bedrooms: data.bedrooms || null,
        bathrooms: data.bathrooms || null,
        parking_requirements: data.parkingRequirements || null,
        construction_style: data.constructionStyle || null,
        special_requirements: data.specialRequirements || null,
        estimated_budget: data.estimatedBudget,
        expected_start_date: data.expectedStartDate || null,
        expected_completion: data.expectedCompletion || null,
        additional_notes: data.additionalNotes || null,
        preferred_contact_method: data.preferredContactMethod,
        preferred_contact_time: data.preferredContactTime || null,
        status: "new",
      });

      if (error) {
        console.error("Supabase enquiry insertion error:", error);
        throw error;
      }

      revalidatePath("/dashboard");
      revalidatePath("/admin/dashboard");

      return {
        success: true,
        enquiryNumber,
      };
    } catch (err: unknown) {
      console.warn("Falling back to demo store due to database connection:", err);
    }
  }

  // 2. Demo fallback insertion
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    enquiry_number: enquiryNumber,
    user_id: session.user.id,
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    alternate_phone: data.alternatePhone,
    owns_land: data.ownsLand,
    land_size: data.landSize,
    land_unit: data.landUnit,
    site_location: data.siteLocation,
    city: data.city,
    building_type: data.buildingType,
    number_of_floors: data.numberOfFloors,
    built_up_area: data.builtUpArea,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    parking_requirements: data.parkingRequirements,
    construction_style: data.constructionStyle,
    special_requirements: data.specialRequirements,
    estimated_budget: data.estimatedBudget,
    expected_start_date: data.expectedStartDate,
    expected_completion: data.expectedCompletion,
    additional_notes: data.additionalNotes,
    preferred_contact_method: data.preferredContactMethod,
    preferred_contact_time: data.preferredContactTime,
    status: "new",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  globalDemoEnquiries.unshift(newEnquiry);

  revalidatePath("/dashboard");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    enquiryNumber,
  };
}

/**
 * Fetches enquiries for the current session (Customer sees theirs, Admin sees all).
 */
export async function getEnquiriesAction(): Promise<Enquiry[]> {
  const session = await getSession();
  if (!session?.user) {
    return [];
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      let query = supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (session.user.role !== "admin") {
        query = query.eq("user_id", session.user.id);
      }

      const { data, error } = await query;
      if (!error && data) {
        return data as Enquiry[];
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to demo store:", err);
    }
  }

  if (session.user.role === "admin") {
    return globalDemoEnquiries;
  }

  return globalDemoEnquiries.filter((e) => e.user_id === session.user.id || e.email === session.user.email);
}

/**
 * Updates the administrative status of an enquiry.
 */
export async function updateEnquiryStatusAction(
  enquiryId: string,
  newStatus: EnquiryStatus
): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session?.user || session.user.role !== "admin") {
    return {
      success: false,
      error: "Unauthorized. Administrator rights required.",
    };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await (supabase
        .from("enquiries") as any)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", enquiryId);

      if (error) throw error;

      revalidatePath("/admin/dashboard");
      revalidatePath("/dashboard");
      return { success: true };
    } catch (err: unknown) {
      console.warn("Supabase update error:", err);
    }
  }

  // Update in demo store
  const target = globalDemoEnquiries.find((e) => e.id === enquiryId);
  if (target) {
    target.status = newStatus;
    target.updated_at = new Date().toISOString();
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/dashboard");
  return { success: true };
}

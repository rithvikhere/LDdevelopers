export type UserRole = "customer" | "admin";

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "in_progress"
  | "completed"
  | "closed";

// Row types are `type` aliases (not interfaces) so they satisfy supabase-js's Record<string, unknown> constraint.
export type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type Enquiry = {
  id: string;
  enquiry_number: string;
  /** null for enquiries submitted from the public homepage form (no account) */
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  alternate_phone?: string | null;
  owns_land: boolean;
  land_size?: number | null;
  land_unit?: string | null;
  site_location?: string | null;
  city?: string | null;
  building_type: string;
  number_of_floors?: number | null;
  built_up_area?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  parking_requirements?: string | null;
  construction_style?: string | null;
  special_requirements?: string | null;
  estimated_budget?: string | null;
  expected_start_date?: string | null;
  expected_completion?: string | null;
  additional_notes?: string | null;
  preferred_contact_method?: string | null;
  preferred_contact_time?: string | null;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
};

// Shape follows the generated Supabase types (Tables with Relationships, Views, Functions), which
// supabase-js needs to type queries; without it every table resolves to `never`.
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          role?: UserRole;
          updated_at?: string;
        };
        Relationships: [];
      };
      enquiries: {
        Row: Enquiry;
        // Columns with database defaults (or nullable) are optional on insert
        Insert: Omit<Enquiry, "id" | "user_id" | "owns_land" | "status" | "created_at" | "updated_at"> & {
          id?: string;
          user_id?: string | null;
          owns_land?: boolean;
          status?: EnquiryStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Enquiry, "id" | "user_id" | "enquiry_number">>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      set_user_as_admin: {
        Args: { target_email: string };
        Returns: void;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};


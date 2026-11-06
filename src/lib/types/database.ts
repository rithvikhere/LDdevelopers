export type UserRole = "customer" | "admin";

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "in_progress"
  | "completed"
  | "closed";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  enquiry_number: string;
  user_id: string;
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
}

export interface Database {
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
      };
      enquiries: {
        Row: Enquiry;
        Insert: Omit<Enquiry, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Enquiry, "id" | "user_id" | "enquiry_number">>;
      };
    };
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
  };
}

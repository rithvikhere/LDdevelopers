import { z } from "zod";

export const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  alternatePhone: z.string().optional().nullable(),
  ownsLand: z.boolean().default(true),
  landSize: z.coerce.number().positive("Land size must be positive").optional().nullable(),
  landUnit: z.string().default("sq.ft"),
  siteLocation: z.string().min(2, "Site location / area is required"),
  city: z.string().min(2, "City is required"),
  buildingType: z.string().min(2, "Please select a construction typology"),
  numberOfFloors: z.coerce.number().int().positive().optional().nullable(),
  builtUpArea: z.coerce.number().positive().optional().nullable(),
  bedrooms: z.coerce.number().int().positive().optional().nullable(),
  bathrooms: z.coerce.number().int().positive().optional().nullable(),
  parkingRequirements: z.string().optional().nullable(),
  constructionStyle: z.string().optional().nullable(),
  specialRequirements: z.string().optional().nullable(),
  estimatedBudget: z.string().min(1, "Please select an estimated budget range"),
  expectedStartDate: z.string().optional().nullable(),
  expectedCompletion: z.string().optional().nullable(),
  additionalNotes: z.string().optional().nullable(),
  preferredContactMethod: z.enum(["whatsapp", "phone", "email", "in_person"]).default("whatsapp"),
  preferredContactTime: z.string().optional().nullable(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;


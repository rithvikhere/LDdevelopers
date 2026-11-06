"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, setDemoSession, clearSession } from "@/lib/auth-helpers";
import { customerRegisterSchema, loginSchema } from "@/lib/validations/auth";

export interface AuthActionResult {
  success: boolean;
  error?: string;
  redirectUrl?: string;
}

export async function loginAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: (formData.get("role") as "customer" | "admin") || "customer",
  };

  const validated = loginSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Invalid credentials provided.",
    };
  }

  const { email, password } = validated.data;
  const role = rawData.role;

  // 1. Live Supabase Authentication
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message || "Failed to authenticate. Please check your credentials.",
        };
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("id", data.user.id)
          .single();

        const userRole = (profile as { role?: string; full_name?: string } | null)?.role || "customer";

        if (role === "admin" && userRole !== "admin") {
          await supabase.auth.signOut();
          return {
            success: false,
            error: "Access denied. This account does not possess administrator credentials.",
          };
        }

        return {
          success: true,
          redirectUrl: userRole === "admin" ? "/admin/dashboard" : "/dashboard",
        };
      }
    } catch (err: unknown) {
      console.error("Supabase login error:", err);
    }
  }

  // 2. Demo fallback
  const isDemoAdmin = role === "admin" || email.toLowerCase().includes("admin");
  const demoUser = {
    id: isDemoAdmin ? "demo-admin-id-001" : "demo-client-id-001",
    email: email.toLowerCase(),
    fullName: isDemoAdmin ? "Principal Architect / Admin" : "Prestige Client",
    phone: "+91 98765 43210",
    role: isDemoAdmin ? ("admin" as const) : ("customer" as const),
  };

  await setDemoSession(demoUser);

  return {
    success: true,
    redirectUrl: isDemoAdmin ? "/admin/dashboard" : "/dashboard",
  };
}

export async function registerAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validated = customerRegisterSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Validation failed.",
    };
  }

  const { fullName, email, phone, password } = validated.data;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message || "Registration failed. Please try again.",
        };
      }

      if (data.user) {
        return {
          success: true,
          redirectUrl: "/dashboard",
        };
      }
    } catch (err: unknown) {
      console.error("Supabase registration error:", err);
    }
  }

  const demoUser = {
    id: `client-${Date.now()}`,
    email: email.toLowerCase(),
    fullName,
    phone,
    role: "customer" as const,
  };

  await setDemoSession(demoUser);

  return {
    success: true,
    redirectUrl: "/dashboard",
  };
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/");
}


import { cookies } from "next/headers";
import { createClient as createServerClient } from "@/lib/supabase/server";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    !url.includes("placeholder") &&
    !url.includes("your-project") &&
    key &&
    !key.includes("placeholder") &&
    !key.includes("your-anon-key")
  );
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    role: "customer" | "admin";
  };
}

const DEMO_SESSION_COOKIE = "ld_demo_session";

/**
 * Retrieves the current session, whether backed by live Supabase Auth
 * or graceful demo session when API keys are being provisioned.
 */
export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();

  // 1. Check live Supabase Auth if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        // Fetch role and profile details
        const { data } = await supabase
          .from("profiles")
          .select("full_name, phone, role")
          .eq("id", user.id)
          .single();

        const profile = data as { full_name?: string; phone?: string; role?: string } | null;

        return {
          user: {
            id: user.id,
            email: user.email || "",
            fullName: profile?.full_name || user.user_metadata?.full_name || "Valued Client",
            phone: profile?.phone || user.user_metadata?.phone,
            role: (profile?.role as "customer" | "admin") || "customer",
          },
        };
      }
    } catch {
      // Fall through to cookie session
    }
  }

  // 2. Fallback demo session cookie for seamless testing
  const demoCookie = cookieStore.get(DEMO_SESSION_COOKIE)?.value;
  if (demoCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(demoCookie));
      if (parsed && parsed.email) {
        return {
          user: {
            id: parsed.id || "demo-user-id",
            email: parsed.email,
            fullName: parsed.fullName || "Demo Client",
            phone: parsed.phone || "+91 98765 43210",
            role: parsed.role || "customer",
          },
        };
      }
    } catch {
      return null;
    }
  }

  return null;
}

export async function setDemoSession(user: AuthSession["user"]): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_SESSION_COOKIE, encodeURIComponent(JSON.stringify(user)), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClient();
      await supabase.auth.signOut();
    } catch {}
  }
}

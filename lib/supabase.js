import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// URL y publishable key son valores públicos por diseño (la seguridad vive en RLS).
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ouhpmlyutvsvfhxqumxf.supabase.co";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable__UNk8C7t_kKPC5q7ADK-_w_Itp_P9nc";

export async function supabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components no pueden escribir cookies; el middleware refresca la sesión.
        }
      },
    },
  });
}

// src/lib/supabaseClient.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase env vars are missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

// We still create the client, but if envs are missing this will be obvious in console
export const supabase: SupabaseClient = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);

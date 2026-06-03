import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ArchitectProfile = {
  id: string;
  user_id: string;
  name: string;
  title: string;
  city: string;
  bio: string;
  photo_url: string | null;
  expertises: string[];
  services: string[];
  availability_notes: string;
  starting_price: number | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
};

export type ArchitectPhoto = {
  id: string;
  architect_id: string;
  url: string;
  caption: string | null;
  created_at: string;
};

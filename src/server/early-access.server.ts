import { supabaseAdmin } from "@/integrations/supabase/client.server";

type EarlyAccessSignup = {
  name: string;
  email: string;
  team: string | null;
};

export async function insertEarlyAccessSignup(data: EarlyAccessSignup) {
  return supabaseAdmin.from("early_access_signups").insert(data);
}
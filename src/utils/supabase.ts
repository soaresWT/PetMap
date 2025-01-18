import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bstjhzzotzewkmveiedu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzdGpoenpvdHpld2ttdmVpZWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjExNjcsImV4cCI6MjA1Mjc5NzE2N30.La-3b9PnxpkemVeyur2x96E9Z-WGkYVXTjwT64sqNxc";

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pxacitfyzcbbjhqqztff.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YWNpdGZ5emNiYmpocXF6dGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NjY2NzcsImV4cCI6MjA1NjE0MjY3N30.gB7yhyE4_Gyrk1f1nWvER8Xd9u88BCJL8TPEjeBbz9w";

export const supabase = createClient(supabaseUrl, supabaseKey);

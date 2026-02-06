import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase Project URL and Anon Key
// In a real hackathon, put these in a .env.local file!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-project-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
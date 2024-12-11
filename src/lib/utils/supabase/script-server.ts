import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/types_db';

export function createScriptSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Required environment variables are missing');
  }

  return createClient<Database>(supabaseUrl, supabaseKey);
}

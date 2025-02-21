import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const publickey = process.env.SUPABASE_PUBLIC_API as string;

export const supabase = createClient(URL, publickey);

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getCounties() {
    const { data, error } = await supabase
        .from('counties')
        .select('id, name, slug, description');

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

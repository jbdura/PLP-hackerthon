import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const axiosInstance = axios.create({
    baseURL: `${supabaseUrl}/rest/v1`, // Supabase REST API endpoint
    headers: {
        apiKey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
    },
});


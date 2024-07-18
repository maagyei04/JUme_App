import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const fetchCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data, error } = await supabase.from('categories').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}
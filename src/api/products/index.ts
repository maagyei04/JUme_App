import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const fetchProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = (await supabase.from('products').select('*'));
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}

export const fetchProductsByLimit = (limit: number) => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = (await supabase.from('products').select('*').limit(limit));
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}

export const fetchProductsByCategory = (category: string) => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*').eq('category', category);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}

export const fetchProductsById = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}

export const fetchProductsBySearchTerm = (searchTerm: string) => {
    return useQuery({
        queryKey: ['products', 'search', searchTerm],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);

            if (error) throw new Error(error.message);
            return data;
        },
    });
};
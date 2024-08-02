import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Address } from "@/types";

export const fetchOrder = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const { data, error } = (await supabase.from('orders').select('*'));
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}


export const fetchOrderById = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select('*').eq('user_id', id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}

export const createOrder = async (order: any) => {
    const { data, error } = await supabase.from('orders').insert(order).single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
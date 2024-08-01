import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Address } from "@/types";

export const fetchAddrresses = () => {
    return useQuery({
        queryKey: ['addresses'],
        queryFn: async () => {
            const { data, error } = (await supabase.from('addresses').select('*'));
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}


export const fetchAddressById = (id: number) => {
    return useQuery({
        queryKey: ['addresses', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('addresses').select('*').eq('user_id', id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}

export const createAddress = async (address: Address) => {
    const { data, error } = await supabase.from('addresses').insert(address).single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
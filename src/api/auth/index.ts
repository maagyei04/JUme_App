import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";


async function upsertProfile(userId: string, username: string, email: string, phone_number: string) {
    try {
        console.log(`Upserting profile for userId: ${userId}`);

        const { data: existingProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        const profileData = {
            id: userId,
            username: username,
            avatar_url: '',
            user_type: 'USER',
            email: email,
            phone_number: phone_number,
        };

        if (existingProfile) {
            console.log(`Profile exists for userId: ${userId}, updating profile.`);
            // Update existing profile
            const { error: updateError } = await supabase
                .from('profiles')
                .update(profileData)
                .eq('id', userId);

            if (updateError) throw updateError;

            console.log('Profile updated successfully');
        } else {
            console.log(`No profile found for userId: ${userId}, inserting new profile.`);
            // Insert new profile
            try {
                const { error: insertError } = await supabase
                    .from('profiles')
                    .insert(profileData);

                if (insertError) throw insertError;

                console.log('Profile inserted successfully');
            } catch (insertError) {
                const error = insertError as { code: string }; // Type assertion
                if (error.code === '23505') {
                    console.log(`Duplicate key error for userId: ${userId}, retrying update.`);
                    // Retry update if duplicate key error occurs
                    const { error: updateError } = await supabase
                        .from('profiles')
                        .update([profileData])
                        .eq('id', userId);

                    if (updateError) throw updateError;

                    console.log('Profile updated successfully after retry');
                } else {
                    throw insertError;
                }
            }
        }
    } catch (error) {
        console.error('Error upserting profile:', error);
        throw error;
    }
}

async function fetchUserById(userId: string) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export { upsertProfile, fetchUserById };
import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};

const supabaseUrl = 'https://xbzcbqcevoxtvnpjxdpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiemNicWNldm94dHZucGp4ZHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNDQyMjAsImV4cCI6MjAzMjgyMDIyMH0.nvgknENXOvXlupkSdemcocior3fDmgvm6LYC3Eb75YA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
    db: {
        schema: 'public',
    },
    global: {
        headers: { 'X-App-Name': 'JUme_App' },
    },
});
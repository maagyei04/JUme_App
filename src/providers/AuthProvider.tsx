import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type AuthData = {
    session: Session | null;
    profile: any;
    loading: boolean;
}

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
});

type Profile = {
    id: string;
    username: string;
};

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Auth provider is mounted');

        const fetchSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                const userData: Profile = {
                    id: data?.id,
                    username: data?.username,
                };
                setProfile(userData);
            }

            setLoading(false);

        };

        fetchSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading, profile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
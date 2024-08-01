import { useAuth } from "@/providers/AuthProvider"
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";

const index = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!session) {
        return <Redirect href={'/(auth)/GetStarted/'} />;
    }

    if (session) {
        return <Redirect href={'/(tabs)/Profile/'} />;
    }
}

export default index;
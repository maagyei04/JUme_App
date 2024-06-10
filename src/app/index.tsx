import { useAuth } from "@/providers/AuthProvider"
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";

const index = () => {
    const { session, loading, isAdmin, isSeller } = useAuth();

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!session) {
        return <Redirect href={'/AuthScreen'} />;
    }

    if (session) {
        return <Redirect href={'/(tabs)/Profile/'} />;
    }

    if (!isAdmin) {
        return <Redirect href={'/(tabs)/Profile/'} />;
    }

    if (!isSeller) {
        return <Redirect href={'/(tabs)/Profile/'} />;
    }
}

export default index;
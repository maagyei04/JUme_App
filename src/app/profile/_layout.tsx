import { Stack } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function SubStack() {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='orders' options={{ headerShown: false }} />
            <Stack.Screen name='follow' options={{ headerShown: false }} />
            <Stack.Screen name='inbox' options={{ headerShown: false }} />
            <Stack.Screen name='rating' options={{ headerShown: false }} />
            <Stack.Screen name='saved' options={{ headerShown: false }} />
            <Stack.Screen name='vouchers' options={{ headerShown: false }} />
        </Stack>
    );
}
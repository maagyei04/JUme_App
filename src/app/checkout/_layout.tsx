import { Stack } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function CheckoutStack() {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='address' options={{ headerShown: false }} />
            <Stack.Screen name='delivery' options={{ headerShown: false }} />
            <Stack.Screen name='payment' options={{ headerShown: false }} />
            <Stack.Screen name='confirm' options={{ headerShown: false }} />
        </Stack>
    );
}
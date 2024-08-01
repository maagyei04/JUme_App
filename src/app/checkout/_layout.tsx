import { Stack } from 'expo-router';

export default function CheckoutStack() {
    return (
        <Stack>
            <Stack.Screen name='address' options={{ headerShown: false }} />
            <Stack.Screen name='delivery' options={{ headerShown: false }} />
            <Stack.Screen name='payment' options={{ headerShown: false }} />
            <Stack.Screen name='confirm' options={{ headerShown: false }} />
        </Stack>
    );
}
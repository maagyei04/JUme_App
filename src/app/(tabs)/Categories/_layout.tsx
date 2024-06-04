import { Stack } from 'expo-router';

export default function CategoryStack() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
    );
}
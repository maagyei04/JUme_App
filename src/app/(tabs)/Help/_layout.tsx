import { Stack } from 'expo-router';

export default function HelpStack() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
    );
}
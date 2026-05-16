import { syncUserToDatabase } from '@/src/lib/auth';
import { useUser } from '@clerk/expo';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;

        syncUserToDatabase(user);
    }, [user]);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}
export default RootLayout

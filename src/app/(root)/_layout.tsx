import { SplashScreen, Stack } from 'expo-router';
import { useUser } from '@clerk/expo';
import { useEffect } from 'react';
import { syncUserToDatabase } from '@/src/lib/auth';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const { user } = useUser();

    useEffect(() => {
        syncUserToDatabase(user);
    }, [user]);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}
export default RootLayout

import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'

export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {
        return <Redirect href={'/(root)/(tabs)/home'} />
    }
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
        </Stack>
    )
}
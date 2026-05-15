import { useClerk } from '@clerk/expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    const { signOut } = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            if (typeof signOut === 'function') {
                await signOut();
            }
            router.replace('/(auth)/sign-in');
        } catch (error) {
            console.error("Logout failed:", error);
            // Guarantee redirection to sign-in page even if token clearing throws a warning/error
            router.replace('/(auth)/sign-in');
        }
    };

    return (
        <SafeAreaView className='flex-1 bg-white p-5'>
            <View className='flex-1 items-center justify-center'>
                <Text className='text-2xl font-bold mb-10'>Profile</Text>

                <TouchableOpacity 
                    onPress={handleLogout}
                    className='bg-red-500 w-full py-4 rounded-xl items-center'
                >
                    <Text className='text-white font-JakartaBold text-lg'>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default Profile
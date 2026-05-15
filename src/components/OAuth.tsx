import { useOAuth } from '@clerk/expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback, useEffect } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { icons } from '../constants'
import { fetchAPI } from '../lib/fetch'
import CustomButton from './CustomButton'

const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

const OAuth = () => {
    useWarmUpBrowser()
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const handleGoogleSignIn = useCallback(async () => {
        try {
            const { createdSessionId, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/(root)/(tabs)/home', { scheme: 'uberclone' }),
            })

            if (createdSessionId) {
                if (setActive) {
                    await setActive({ session: createdSessionId })

                    if (signUp?.createdUserId) {
                        await fetchAPI('/(api)/user', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: `${signUp.firstName || ''} ${signUp.lastName || ''}`.trim(),
                                email: signUp.emailAddress,
                                clerkId: signUp.createdUserId,
                            }),
                        })
                    }
                }
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error('OAuth error', err)
            Alert.alert('Error', 'Failed to sign in with Google')
        }
    }, [startOAuthFlow])

    return (
        <View>
            <View className='flex flex-row justify-center items-center mt-4 gap-x-3'>
                <View className='flex-1 h-[1px] bg-general-100' />
                <Text className='text-lg '>Or</Text>
                <View className='flex-1 h-[1px] bg-general-100' />
            </View>

            <CustomButton
                title="Log In with Google"
                className='mt-5 w-full shadow-none'
                IconLeft={() => (
                    <Image source={icons.google} resizeMode='contain' className='w-5 h-5 mx-2' />
                )}
                bgVariant="outline"
                textVariant='primary'
                onPress={handleGoogleSignIn}
            />
        </View>
    )
}

export default OAuth
import CustomButton from '@/src/components/CustomButton'
import InputField from '@/src/components/InputField'
import OAuth from '@/src/components/OAuth'
import { icons, images } from '@/src/constants'
import { useSignIn } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'


const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn() as any;
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const onSignInPress = useCallback(async () => {
    console.log("Sign in button pressed");
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!signIn) {
      console.log("signIn object not available");
      return;
    }

    try {
      const response: any = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      console.log("signIn.create response keys:", response ? Object.keys(response) : null);

      if (response && response.error) {
        console.log("Sign in create error response:", JSON.stringify(response.error, null, 2));
        const errCode = response.error?.errors?.[0]?.code;
        if (errCode === 'session_exists') {
          router.push('/(root)/(tabs)/home');
          return;
        }
        const errMsg = response.error?.errors?.[0]?.longMessage || response.error?.errors?.[0]?.message || response.error?.message || "Sign in failed";
        Alert.alert("Error", errMsg);
        return;
      }

      // Handle the nested result structure
      let signInAttempt = response?.result || response;
      while (signInAttempt && signInAttempt.result && !signInAttempt.status) {
        signInAttempt = signInAttempt.result;
      }

      const finalStatus = signInAttempt?.status || signIn?.status;
      const finalSessionId = signInAttempt?.createdSessionId || signIn?.createdSessionId;

      console.log("Resolved status:", finalStatus, "sessionId:", finalSessionId);

      if (finalStatus === 'complete' || finalStatus === 'success' || finalSessionId || (response && response.error === null)) {
        if (typeof setActive === 'function' && finalSessionId) {
          await setActive({ session: finalSessionId });
        }
        router.push('/(root)/(tabs)/home');
      } else {
        console.error("Sign in incomplete status payload:", JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Notice", "Sign in incomplete. Status: " + (finalStatus || "unknown"));
      }
    } catch (err: any) {
      console.log("Sign in catch error:", err);
      const errCode = err?.errors?.[0]?.code;
      if (errCode === 'session_exists') {
        router.push('/(root)/(tabs)/home');
        return;
      }
      const errorMessage = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || "Sign in failed";
      Alert.alert("Error", errorMessage);
    }
  }, [signIn, setActive, router, form.email, form.password]);

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1'>
        <View className='relative w-full h-60'>
          <Image
            source={images.signUpCar}
            className='z-0 w-full h-60'
          />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Welcome Back</Text>
        </View>
        <View className='p-5'>

          <InputField
            label='Email'
            placeholder='Enter your email'
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label='Password'
            placeholder='Enter your password'
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />

          {/* forgot password
          <Link href='/(auth)/forgot-password'>
            <Text className='text-end text-black font-JakartaMedium mt-3'>Forgot Password?</Text>
          </Link> */}


          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className='mt-6'
          />


          {/* oauth buttons */}
          <OAuth />


          <Link href='/(auth)/sign-up'>
            <Text className='text-center text-black font-JakartaMedium mt-6'>Don't have an account? <Text className='text-primary-500 font-JakartaBold'>Sign Up</Text></Text>
          </Link>

          {/* verification modal  */}








        </View>
      </View>
    </ScrollView>
  )
}

export default SignIn

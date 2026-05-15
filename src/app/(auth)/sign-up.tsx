import CustomButton from '@/src/components/CustomButton'
import InputField from '@/src/components/InputField'
import OAuth from '@/src/components/OAuth'
import { icons, images } from '@/src/constants'
import { fetchAPI } from '@/src/lib/fetch'
import { useSignUp, useClerk } from '@clerk/expo'
import { Link, router } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'

const SignUp = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp() as any;
  const { client } = useClerk();

  // Redirect automatically if user is already logged in
  useEffect(() => {
    if (client?.sessions?.length > 0) {
      router.replace('/(root)/(tabs)/home');
    }
  }, [client]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [verification, setVerification] = useState({
    state: "idle",
    error: "",
    code: "",
  })

  const onSignUpPress = async () => {
    console.log("Sign up button pressed");
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!signUp) {
      console.log("signUp not available");
      return;
    }

    try {
      const response = await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // If the wrapper returns an error object instead of throwing
      const responseAny = response as any;
      if (responseAny?.error) {
        Alert.alert("Error", responseAny.error?.errors?.[0]?.message || "Sign up failed");
        return;
      }

      // Unwrap the resource from the custom wrapper
      let clerkSignUp = response?.result || response || signUp;
      while (clerkSignUp && clerkSignUp.result && typeof clerkSignUp.prepareEmailAddressVerification !== 'function') {
        clerkSignUp = clerkSignUp.result;
      }

      if (typeof client.signUp.prepareEmailAddressVerification === 'function') {
        await client.signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      } else if (typeof client.signUp.prepareVerification === 'function') {
        await client.signUp.prepareVerification({ strategy: "email_code" });
      } else {
        console.log("client.signUp keys:", Object.keys(client.signUp));
        throw new Error("Could not find prepare verification method on client.signUp");
      }

      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      console.log("Sign up catch error:", err);
      const errorMessage = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || "An unknown error occurred";
      Alert.alert("Error", errorMessage);
    }
  };

  const onPressVerify = async () => {
    if (!signUp) {
      return;
    }
    if (!verification.code) {
      Alert.alert("Error", "Please enter verification code");
      return;
    }
    try {
      const response = await client.signUp.attemptEmailAddressVerification({
        code: verification.code,
      }).catch(async (e) => {
        return await client.signUp.attemptVerification({
          strategy: "email_code",
          code: verification.code,
        });
      });

      // Handle wrapper error object
      const responseAny = response as any;
      if (responseAny?.error) {
        setVerification({ ...verification, state: 'failed', error: responseAny.error?.errors?.[0]?.message || "Verification failed" });
        return;
      }

      // We can use client.signUp directly to check status
      const completeSignUp = client.signUp;

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        if (typeof setActive === 'function' && completeSignUp?.createdSessionId) {
          await setActive({ session: completeSignUp.createdSessionId });
        }
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({ ...verification, state: 'failed', error: 'Verification Failed !' });
      }
    } catch (err: any) {
      console.log("Verification catch error:", err);
      const errorMessage = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || 'Unknown error';
      setVerification({ ...verification, state: 'failed', error: errorMessage });
    }
  };

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1'>
        <View className='relative w-full h-60'>
          <Image
            source={images.signUpCar}
            className='z-0 w-full h-60'
          />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>Create Your Account</Text>
        </View>
        <View className='p-5'>
          <InputField
            label='Full Name'
            placeholder='Enter your full name'
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className='mt-6'
          />


          {/* oauth buttons */}
          <OAuth />


          <Link href='/(auth)/sign-in'>
            <Text className='text-center text-black font-JakartaMedium mt-6'>Already have an account? <Text className='text-primary-500 font-JakartaBold'>Sign In</Text></Text>
          </Link>

          {/* verification modal  */}
          <ReactNativeModal isVisible={verification.state === "pending"}
            onModalHide={() => {
              if (verification.state === "success") setShowSuccessModal(true)
            }}
          >
            <View className='bg-white px-7 py-9 rounded-2xl min-h-28'>
              <Text className='text-2xl font-JakartaExtraBold mb-2'>
                Verification
              </Text>
              <Text className='font-Jakarta mb-5'>
                We have sent a verification code to {form.email}
              </Text>
              <InputField
                label='Code'
                icon={icons.lock}
                placeholder='12345'
                value={verification.code}
                keyboardType='numeric'
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
              />
              {verification.error && (
                <Text className='text-red-500 text-sm mt-1'>
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title="Verify Email"
                onPress={onPressVerify}
                className='mt-5 bg-success-500'
              />
              <CustomButton
                title="Cancel"
                className='mt-4 bg-gray-400'
                onPress={() => setVerification({ ...verification, state: "idle" })}
              />
            </View>

          </ReactNativeModal>


          <ReactNativeModal isVisible={showSuccessModal}>
            <View className='bg-white px-7 py-9 rounded-2xl min-h-80'>
              <Image
                source={images.check}
                className='w-28 h-28 mx-auto my-5'
              />
              <Text className='text-3xl font-JakartaBold text-center'>Verified</Text>
              <Text className='text-base text-gray-400 font-Jakarta text-center mt-2'>
                You succesfully verified your account.
              </Text>
              <CustomButton
                title="Browse Home"
                onPress={() => router.push('/(root)/(tabs)/home')}
                className='mt-6'
              />
            </View>
          </ReactNativeModal>









        </View>
      </View>
    </ScrollView>
  )
}

export default SignUp

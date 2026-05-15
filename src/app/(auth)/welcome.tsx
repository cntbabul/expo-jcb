import CustomButton from '@/src/components/CustomButton'
import { onboarding } from '@/src/constants'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

const Onboarding = () => {
  const SwipeRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className='flex-1 h-full justify-between items-center bg-white'>
      <Pressable onPress={() => {
        router.replace("/(auth)/sign-up");
      }}
        className="w-full flex justify-end items-end p-5 mt-5"
      >

        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </Pressable>
      <Swiper
        ref={SwipeRef}
        loop={false}
        dot={<View className='w-8 h-1 mx-1 bg-[#E2E8F0] rounded-full' />}
        activeDot={<View className='w-8 h-1 mx-1 bg-[#0286ff] rounded-full' />}
        onIndexChanged={(index) => setActiveIndex(index)}>
        {
          onboarding.map((item) => (
            <View key={item.id}
              className='flex items-center justify-center p-5'
            >
              <Image source={item.image} className='w-full h-80' resizeMode="contain" />
              <View className='flex flex-row items-center justify-center w-full mt-10'>
                <Text className='text-black text-3xl font-JakartaBold mx-10 text-center'>{item.title}</Text>
              </View>
              <Text className='text-md font-JakartaSemiBold text-center text-secondary-600 mx-10 mt-3'>{item.description}</Text>
            </View>
          ))
        }
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() => {
          isLastSlide ? router.replace("/(auth)/sign-up") : SwipeRef.current?.scrollBy(1);
        }}
        bgVariant="primary"
        textVariant="default"
      />
    </SafeAreaView >
  )
}

export default Onboarding

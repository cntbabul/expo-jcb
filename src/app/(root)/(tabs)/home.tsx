import GoogleTextInput from '@/src/components/GoogleTextInput'
import { icons, images } from '@/src/constants'
import { recentRides } from '@/src/constants/mockRides'
import { useUser } from '@clerk/expo'
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RideCard from '@/src/components/RideCard'
import Map from "@/src/components/Map";



export default function Page() {
    const { user } = useUser()
    const loading = true;

    const handleSignout = () => {
        console.log("Signout");
    }
    const handleDestinationPress = () => {
        console.log("Destination pressed");
    }

    return (
        <SafeAreaView className="bg-general-500">
            <FlatList data={recentRides?.slice(0, 5)}
                renderItem={({ item }) => (
                    <RideCard ride={item} />
                )}
                className='px-5'
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                ListEmptyComponent={() => (
                    <View className="flex flex-col items-center justify-center">
                        {!loading ? (
                            <>
                                <Image source={images.noResult} className="w-40 h-40"
                                    alt="No recent rides found"
                                    resizeMode="contain" />
                                <Text className="text-sm font-JakartaMedium text-gray-500">No recent rides found</Text>
                            </>
                        ) : (
                            <Text className="text-sm font-JakartaMedium text-gray-500">
                                <ActivityIndicator size="small" color={"gray"} />
                            </Text>
                        )}
                    </View>
                )}
                ListHeaderComponent={() => (
                    <>
                        {/* Header */}
                        <View className="flex flex-row items-center justify-between my-5">
                            <Text className="text-gray-800 text-2xl font-JakartaBold">Welcome, {user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split('@')?.[0]}👋</Text>
                            <Pressable onPress={handleSignout} className='justify-center items-center w-10 h-10 rounded-full bg-general-100'>
                                <Image source={icons.out} className="w-4 h-4" alt="user profile" />
                            </Pressable>
                        </View>
                        {/* Google Text Input */}
                        <GoogleTextInput
                            icon={icons.search}
                            containerStyle="bg-white shadow-md shadow-neutral-300 "
                            handlePress={handleDestinationPress}
                        />
                        <>
                            <Text className='text-xl font-JakartaBold mt-5 mb-3'>
                                Your current location
                            </Text>
                            <View className='flex flex-row items-center bg-transparent h-80 '>
                                {/* Map */}
                                <Map />

                            </View>
                        </>
                        <Text className="text-xl font-JakartaBold mt-5 mb-3">
                            Recent Rides
                        </Text>
                    </>
                )}
            />


        </SafeAreaView>
    )
}
import { useClerk, useUser } from '@clerk/expo'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
    const { user } = useUser()
    const { signOut } = useClerk()

    return (
        <SafeAreaView className="flex-1 p-5 pt-[60px] gap-4">
            <Text className="text-2xl font-bold">Welcome!</Text>


        </SafeAreaView>
    )
}
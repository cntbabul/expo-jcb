import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const TabIcon = ({
    name,
    focused,
}: {
    name: keyof typeof Ionicons.glyphMap
    focused: boolean
}) => (
    <View
        className={`w-12 h-12 items-center justify-center rounded-full ${focused ? 'bg-general-400' : ''}`}
    >
        <Ionicons name={name} size={24} color="white" />
    </View>
)


const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                // tabBarActiveTintColor: 'white',
                // tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#101010',
                    borderRadius: 50,
                    overflow: 'hidden',
                    height: 60,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    position: 'absolute',
                    marginHorizontal: 20,
                    paddingTop: 12,
                    bottom: 45,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="home" />,
                }}
            />
            <Tabs.Screen
                name="rides"
                options={{
                    title: 'Rides',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="list" />,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} name="chatbubble-ellipses" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} name="person" />,
                }}
            />
        </Tabs>
    )
}
export default TabsLayout
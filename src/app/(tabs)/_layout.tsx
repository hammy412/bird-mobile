import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
    <Tabs
        screenOptions={{
            tabBarStyle: {
                backgroundColor: '#1F2937', // gray-800
                borderTopColor: '#374151', // gray-700
            },
            tabBarActiveTintColor: '#3B82F6', // blue-500
            tabBarInactiveTintColor: '#9CA3AF', // gray-400
        }}
    >
        <Tabs.Screen 
            name="index" 
            options={{ 
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            }} 
        />
        <Tabs.Screen 
            name="quiz" 
            options={{ 
                title: "Quiz",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="play-circle" size={size} color={color} />
                ),
            }} 
        />
    </Tabs>
    );
}
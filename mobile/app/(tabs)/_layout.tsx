import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1B3A5C',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="podcast"
        options={{
          title: 'Podcast',
          tabBarIcon: ({ color }) => (
            <Ionicons name="mic" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
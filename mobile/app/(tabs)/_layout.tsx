import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Header } from '../../components/shared/Header'
import { colors } from '../../constants/colors'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/shared/Button'

export default function TabLayout() {
  const [profileVisible, setProfileVisible] = useState(false);
  const { profile, handleLogout } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Header onProfilePress={() => setProfileVisible(prev => !prev)} />
      {profileVisible && (
        <View style={styles.profileDropdown}>
          <Text style={styles.username}>{profile?.username}</Text>
          <Text style={styles.bio}>No bio yet.</Text>
          <View style={styles.divider} />
          <View style= {{ flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => { handleLogout(); setProfileVisible(false); }}>
              <Text style={styles.logout}>Log Out</Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <Button onPress={() => (router.push('/tabs'))} icon='settings' variant='ghost' size='sm'></Button>
            </View>
          </View>
        </View>
      )}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: colors.primary, borderTopWidth: 0 },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.muted,
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
    </View>
  )
}


const styles = StyleSheet.create({
  bio: {
    color: colors.muted,
    fontSize: 13, 
    marginBottom: 12, 
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff22',
    marginBottom: 8,
  },
  logout: {
    color: '#ff6b6b',
    fontWeight: '600',
    top: 3
  },
  username: {
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileDropdown: {
    position: 'absolute',
    top: 60,
    right: 12,
    backgroundColor: '#1e2a3a',
    borderRadius: 10,
    padding: 16,
    width: 250,
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  button: {
    top: 1,
    left: 120,
  }
})
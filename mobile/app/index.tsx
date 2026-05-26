import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { supabase } from '../services/supabaseClient'

export default function Index() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('users').select('*').limit(1)
      if (error) {
        console.log('Connection failed:', error.message)
      } else {
        console.log('Connected successfully:', data)
      }
    }
    testConnection()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>BlueBlooded</Text>
    </View>
  )
}
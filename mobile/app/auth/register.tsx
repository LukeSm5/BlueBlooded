// app/auth/login.tsx
import { View, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleRegister = async () => {
    // your supabase register logic here
    router.replace('/(tabs)')
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>

        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          label="Username"
          placeholder="you123"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        

        <View style={styles.buttons}>
          <View style={styles.buttonWrapper}>
            <Button label="Back" onPress={() => router.push('/auth/login')} fullWidth />
          </View>
          <View style={styles.buttonWrapper}>
            <Button label="Register" onPress={() => router.push('/(tabs)')} variant="secondary" fullWidth />
          </View>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  form: {
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  buttonWrapper: {
    flex: 1,
  },
})
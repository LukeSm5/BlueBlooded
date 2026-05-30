import { View, StyleSheet, Text } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'
import { supabase } from '../../services/supabaseClient'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')
    if (!email || !username.trim() || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username.trim(),
        },
      }
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session === null) {
      // User needs to verify their email
      router.replace('/(tabs)');
      return;
    } else {
      router.replace('/(tabs)')
    }
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
        />

        <TextInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.buttons}>
          <View style={styles.buttonWrapper}>
            <Button label="Back" onPress={() => router.push('/auth/login')} fullWidth />
          </View>
          <View style={styles.buttonWrapper}>
            <Button label="Register" onPress={handleRegister} variant="secondary" fullWidth />
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
  error: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 8,
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
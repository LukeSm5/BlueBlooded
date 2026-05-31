import { View, StyleSheet, Text } from 'react-native'
import { router } from 'expo-router'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'
import { useAuth } from '../../hooks/useAuth'

export default function Register() {
  const { username, setUsername, password, setPassword, email, setEmail, error, loading, handleRegister} = useAuth();

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
            <Button label="Register" onPress={handleRegister} variant="primary" fullWidth />
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
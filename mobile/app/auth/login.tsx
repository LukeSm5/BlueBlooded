import { View, StyleSheet, Text } from 'react-native'
import { router } from 'expo-router'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'
import { useAuth } from '../../hooks/useAuth'
import { Header } from '../../components/shared/Header'
import { colors } from '../../constants/colors'

export default function Login() {
  const { email, setEmail, password, setPassword, error, loading, handleLogin } = useAuth();

  return (
    <View style = {{flex: 1}}>
      <Header/>
        <Text style={styles.title}>Login</Text>
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
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttons}>
            <View style={styles.buttonWrapper}>
              <Button label="Log in" onPress={handleLogin} fullWidth />
            </View>
            <View style={styles.buttonWrapper}>
              <Button label="Register" onPress={() => router.push('/auth/register')} variant="primary" fullWidth />
            </View>
          </View>

          <Button
            label="Forgot password?"
            onPress={() => router.push('/auth/resetPasswordEmail')}
            variant="ghost"
            fullWidth
          />

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
  title: {
          marginTop: 20,
          color: colors.white,
          fontSize: 24,
          textAlign: 'center',
          fontFamily: 'Anton-Regular',
  },
})
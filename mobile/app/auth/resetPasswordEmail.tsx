import { View, StyleSheet, Text, Alert } from 'react-native'
import { router } from 'expo-router'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { Header } from '../../components/shared/Header'

export default function resetPassword() {
  const { email, setEmail, error, setError, loading } = useAuth();

  const handleResetPasswordEmail = async () => {
    setError('');

    const {error: resetError} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'blueblooded://auth/reset-password',
    });
    if (resetError) {
        setError(resetError.message);
        return;
    }

    Alert.alert('Email successfully sent.')
    router.push('/auth/login')
  }

  return (
    <View style={{flex: 1}}>
      <Header/>
      <View style={styles.container}>
        <View style={styles.form}>

          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttons}>
            <View style={styles.buttonWrapper}>
              <Button label="Back" onPress={() => router.push('/auth/login') } fullWidth />
            </View>
            <View style={styles.buttonWrapper}>
              <Button label="Send Email" onPress={handleResetPasswordEmail} variant="primary" fullWidth />
            </View>
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
import { View, StyleSheet, Text } from 'react-native'
import { router } from 'expo-router'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import * as Linking from 'expo-linking'
import { useEffect } from 'react'

export default function resetPassword() {
  const { error, setError, loading } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        supabase.auth.exchangeCodeForSession(url);
      }
    });
  }, []);

  const handleResetPassword = async () =>  {
    setError('');
    if (newPassword != confirmPassword) {
      setError('Passwords must match');
      return;
    }
    const {error: updateError} = await supabase.auth.updateUser({
      password: newPassword
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }
    router.push('/auth/login');

  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          label="New Password"
          placeholder="••••••••"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <TextInput
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.buttons}>
          <View style={styles.buttonWrapper}>
            <Button label="Back" onPress={() => router.push('/auth/login') } fullWidth />
          </View>
          <View style={styles.buttonWrapper}>
            <Button label="Reset Password" onPress={handleResetPassword} variant="primary" fullWidth />
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
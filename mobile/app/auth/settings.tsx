import { View, StyleSheet, Text } from 'react-native'
import { router } from 'expo-router'
import TextInput from '../../components/shared/TextInput'
import Button from '../../components/shared/Button'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { Header } from '../../components/shared/Header'
import { useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
import { colors } from '../../constants/colors'

export default function settings() {
  const { bio, setBio, error, loading, user, username, setUsername, setError } = useAuth();
  const [localUsername, setLocalUsername] = useState('');
  const [localBio, setLocalBio] = useState('');

  useEffect(() => {
    if (username) setLocalUsername(username);
  }, [username]);

  useEffect(() => {
  if (bio) setLocalBio(bio);
  }, [bio]);

  async function handleChangeUsername() {
  if (!user) {
    setError("You are not logged in.");
    return;
  }
  if (localUsername === username) {
    setError("Username is the same as your current one.");
    return;
  }

  const { error } = await supabase
    .from('users')
    .update({ username: localUsername })
    .eq('id', user.id);

  if (error) {
    setError(error.message);
    return;
  }

  setUsername(localUsername);
  router.push('/(tabs)');
}

async function handleChangeBio() {
  if (!user) {
    setError("You are not logged in.");
    return;
  }

  const { error } = await supabase
    .from('users')
    .update({ bio: localBio })
    .eq('id', user.id);

  if (error) {
    setError(error.message);
    return;
  }
  setBio(localBio);
  router.push('/(tabs)');
}
  return (
    <View style={{flex: 1}}>
      <Header/>
      <View style={{flex: 1}}>
        <Text style={styles.title}>Edit Account Details</Text>
        <View style={styles.container}>
          <View style={styles.form}>

            <TextInput
              label="Username"
              placeholder={localUsername}
              value={localUsername}
              onChangeText={setLocalUsername}
            />
            <TextInput
              label="Bio"
              placeholder={localBio}
              value={localBio}
              onChangeText={setLocalBio}
            />
            

            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.buttons}>
              <View style={styles.buttonWrapper}>
                <Button label="Back" onPress={() => {
                    router.push('/(tabs)');
                }} fullWidth />
              </View>
              <View style={styles.buttonWrapper}>
                <Button label="Update Details" onPress={async () => {
                  await handleChangeUsername();
                  await handleChangeBio(); }} variant="primary" fullWidth />
              </View>
            </View>

          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
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
  }
})
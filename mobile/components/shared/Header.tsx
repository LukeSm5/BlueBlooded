import { View, StyleSheet, Image, Text } from 'react-native';
import { colors } from '../../constants/colors';
import Button  from './Button';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export function Header({ onProfilePress }: { onProfilePress?: () => void }) {
    const router = useRouter();
    const { user } = useAuth();
    return (
        <View style={styles.container}>
            <View style={styles.side}/>
            <Image
                source={require('../../assets/images/BlueBlooded Logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.side}>
            {onProfilePress && (user ? <Button icon="person-outline" onPress={onProfilePress} variant="primary"/>
            : <Button label="Login" onPress={() => router.push('/auth/login')} variant="primary" /> )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  side: {
    width: 80,
    alignItems: 'flex-end',
  },
  logo: {
    height: 40,
    width: 120,
  },
})
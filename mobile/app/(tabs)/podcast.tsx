import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/shared/Button';

const PodcastScreen = () => {
    const router = useRouter();
    
    const login = async () => {
        router.push('/auth/login')
    }

    return (
        <View>
            <Button label="Login" onPress={login} />
        </View>
    );
};

const styles = StyleSheet.create({
    loginButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    }
})
export default PodcastScreen;
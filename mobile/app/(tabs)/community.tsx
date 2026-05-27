import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/shared/Button';

const CommunityScreen = () => {
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
export default CommunityScreen;
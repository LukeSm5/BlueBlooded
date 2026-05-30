import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/shared/Button';
import { colors } from '../../constants/colors';

const PodcastScreen = () => {
    const router = useRouter();
    
    const login = async () => {
        router.push('/auth/login')
    }

    return (
        <View style={styles.container}>
            <Button label="Login" onPress={login} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    loginButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    }
})
export default PodcastScreen;
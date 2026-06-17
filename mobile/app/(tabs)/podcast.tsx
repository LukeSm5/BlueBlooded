import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/shared/Button';
import { Text } from 'react-native';
import { colors } from '../../constants/colors';

const PodcastScreen = () => {
    const router = useRouter();
    
    const login = async () => {
        router.push('/auth/login')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Podcast</Text>
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
    },
    title: {
        marginTop: 20,
        color: colors.white,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Anton-Regular',
    },
})
export default PodcastScreen;
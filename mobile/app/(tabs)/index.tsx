import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../../components/shared/Button';
import { colors } from '../../constants/colors';

const StatsScreen = () => {
    const router = useRouter();
    
    const login = async () => {
        router.push('/auth/login')
    }

    return (
        <View style={styles.container}>
        </View>
    );
};
export default StatsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
})
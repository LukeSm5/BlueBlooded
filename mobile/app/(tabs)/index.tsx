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
            <Text style={styles.title}>Statistics</Text>
        </View>
    );
};
export default StatsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        marginTop: 20,
        color: colors.white,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Anton-Regular',
    },
})
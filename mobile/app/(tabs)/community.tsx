import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import Button from '../../components/shared/Button';
import { colors } from '../../constants/colors';
import TextInput from '../../components/shared/TextInput';
const CommunityScreen = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const login = async () => {
        router.push('/auth/login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Discussion Board</Text>
            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
            />
        </SafeAreaView>
    );
};
export default CommunityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        marginTop: 20,
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})
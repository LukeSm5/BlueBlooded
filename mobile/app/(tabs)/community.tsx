import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View } from 'react-native';
import Button from '../../components/shared/Button';
import { colors } from '../../constants/colors';
import TextInput from '../../components/shared/TextInput';
import { CategoryFilter } from '../../components/community/categoryFilter';

const CommunityScreen = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const login = async () => {
        router.push('/auth/login')
    }

    const handleSearch = () => {
        // Implement search functionality here
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Discussion Board</Text>
            <View style={styles.searchContainer}>
                <Button style={styles.button} icon="search" onPress={handleSearch} size = "sm"/>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Search"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <CategoryFilter />
            </View>
            <Text style={styles.subtitle}>Topics</Text>
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
        textAlign: 'center',
        fontFamily: 'Anton-Regular',
    },
    subtitle: {
        marginTop: 10,
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Anton-Regular',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        gap: 8,
        
    },
    inputWrapper: { 
      flex: 1,
      marginBottom: -16,
    },
    button: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    }
})
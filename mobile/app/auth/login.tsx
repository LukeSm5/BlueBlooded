import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import Button from '../../components/shared/Button';
import TextInput from '../../components/shared/TextInput';

const LoginScreen = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const login = async () => {
        router.replace('/(tabs)')
    }

    return (
        <View>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button label="Login" onPress={login} />
        </View>
    );
};
export default LoginScreen;
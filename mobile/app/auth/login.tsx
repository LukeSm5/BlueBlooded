import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import Button from '../../components/shared/Button';

const LoginScreen = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const login = async () => {

    }

    return (
        <View>
            <Button label="Login" onPress={login} />
        </View>
    );
};
export default LoginScreen;
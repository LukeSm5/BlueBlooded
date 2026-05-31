import { useState } from 'react'
import { validateEmail, validatePassword } from '../utils/validateInput'
import { supabase } from '../services/supabaseClient'
import { useRouter } from 'expo-router'

export function useAuth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter();


    const validateSharedFields = () => {
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return false;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        setError('')
        if (!validateSharedFields()) {
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });
        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }
        router.replace('/(tabs)')

    }

    const handleRegister = async () => {
        setError('')
        if (!validateSharedFields()) {
            return;
        }
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: username.trim(),
                }
            }
        });
        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }
        router.replace('/(tabs)')
    }
    return { email, setEmail, password, setPassword, username, setUsername, error, loading, handleLogin, handleRegister }

}
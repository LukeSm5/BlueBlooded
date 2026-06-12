import { useEffect, useState } from 'react'
import { validateEmail, validatePassword } from '../utils/validateInput'
import { supabase } from '../services/supabaseClient'
import { useRouter } from 'expo-router'
import { User } from '@supabase/supabase-js'

export function useAuth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState('')
    const [profile, setProfile] = useState<{ username: string; bio: string } | null>(null);
    const router = useRouter();

     useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (user) fetchProfile(user.id);
        else setProfile(null);
    }, [user]);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
        .from('users')
        .select('username, bio')
        .eq('id', userId)
        .single();

        if (data) setProfile(data);
    };
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
        if (data.user) {
        const { error: profileError } = await supabase
            .from('users')
            .insert({
                id: data.user.id,
                email: email.trim(),
                username: username.trim(),
            });

        if (profileError) {
            setError(profileError.message);
            return;
        }
        }
        
        router.replace('/(tabs)')
    }
    
    const handleLogout = async () => {
        setError('')
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }
        router.replace('/auth/login')
    }

    const userIdToUsername = async (userId: string): Promise<string> => {
        const { data } = await supabase
        .from('users')
        .select('username')
        .eq('id', userId)
        .single();

    return data?.username ?? 'No username yet';
    }

    return { email, setEmail, password, setPassword, username,
            setUsername, error, setError, loading, handleLogin, handleRegister, user,
        handleLogout, profile, userIdToUsername }

}
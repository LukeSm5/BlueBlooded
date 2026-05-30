import { Stack } from 'expo-router'
import { colors } from '../constants/colors';
import { Header } from '../components/shared/Header';

export default function RootLayout() {
  return ( 
  <Stack
  screenOptions={{
    header: () => <Header />,
    contentStyle: { backgroundColor: colors.background },
  }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="auth/register"
    options={{ headerShown: false }} />
    <Stack.Screen name="auth/login"
    options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)"
    options={{ headerShown: false }} />
  </Stack>
  );
}
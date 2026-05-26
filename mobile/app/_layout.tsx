import { Stack } from 'expo-router'

export default function RootLayout() {
  return ( 
  <Stack>
    <Stack.Screen name="index" />
    <Stack.Screen name="auth/register" />
    <Stack.Screen name="auth/login" />
    <Stack.Screen name="(tabs)"
    options={{ headerShown: false }} />
  </Stack>
  );
}
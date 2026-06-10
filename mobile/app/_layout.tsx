import { SplashScreen, Stack } from 'expo-router'
import { colors } from '../constants/colors';
import { Header } from '../components/shared/Header';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function RootLayout() {
  const [ loaded ] = useFonts({
    'Anton-Regular': require('../assets/fonts/Anton-Regular.ttf'), 
    'Inter-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter_18pt-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null;
  }
  return ( 
  <Stack
  screenOptions={{
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
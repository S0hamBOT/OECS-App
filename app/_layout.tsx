import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { StudentProvider } from '../context/StudentContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <SafeAreaProvider>
      <StudentProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="student-form" options={{ presentation: 'card' }} />
        </Stack>
        <StatusBar style="auto" />
      </StudentProvider>
    </SafeAreaProvider>
  );
}
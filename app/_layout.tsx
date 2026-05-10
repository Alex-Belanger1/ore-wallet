import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { oreColors, oreNavigationTheme } from '../constants/theme';
import { OnboardingProvider } from '../lib/onboarding-store';
import { SendFlowProvider } from '../lib/send-flow-store';

export const unstable_settings = {
  initialRouteName: '(onboarding)',
};

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <SendFlowProvider>
        <SafeAreaProvider>
          <ThemeProvider value={oreNavigationTheme}>
            <StatusBar style="light" animated />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: Platform.OS === 'ios' ? 'fade' : 'default',
                contentStyle: {
                  backgroundColor: oreColors.background,
                },
              }}>
              <Stack.Screen name="(onboarding)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="(send)"
                options={{
                  presentation: Platform.OS === 'ios' ? 'modal' : 'card',
                  animation: Platform.OS === 'ios' ? 'slide_from_bottom' : 'fade',
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </SafeAreaProvider>
      </SendFlowProvider>
    </OnboardingProvider>
  );
}

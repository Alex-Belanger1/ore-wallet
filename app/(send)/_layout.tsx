import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function SendLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade',
      }}
    />
  );
}



import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="splash" // 👈 이게 핵심!
      screenOptions={{ headerShown: false }}
    />
  )}

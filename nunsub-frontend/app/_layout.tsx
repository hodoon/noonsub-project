import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="splash" // 👈 이게 핵심!
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen
        name="smsAuth"
        options={{
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="setPin"
        options={{
          animation: "none",
        }}
      />
    </Stack>
  );
}

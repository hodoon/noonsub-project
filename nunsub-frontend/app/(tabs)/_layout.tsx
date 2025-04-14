import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../contexts/UserContext"; // ← 경로 확인

export default function AppLayout() {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen
          name="mypage"
          options={{
            gestureEnabled: false,
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="updateMypage"
          options={{
            gestureEnabled: false,
            animation: "default",
          }}
        />
      </Stack>
    </UserProvider>
  );
}
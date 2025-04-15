import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../contexts/UserContext";

export default function AppLayout() {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}
      >
        <Stack.Screen
          name="home"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="mypage"
          options={{
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="updateMypage"
          options={{
            animation: "default",
          }}
        />
      </Stack>
    </UserProvider>
  );
}

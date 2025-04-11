import { Stack } from "expo-router";
import React from "react";


export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen
        name="mypage"
        options={{
          gestureEnabled: false, // ✅스와이프 제스처 비활성화
          animation: "slide_from_left", // ✅애니메이션 효과
        }}
      />
      <Stack.Screen
        name="updateMypage"
        options={{
          gestureEnabled: false, // ✅스와이프 제스처 비활성화
          animation: "default", // ✅애니메이션 비활성화
        }}
      />
    </Stack>
  );
}
// app/coffee/[id]/_layout.tsx
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

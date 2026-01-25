import { requestLocationPermission } from "@/hooks/getLocation";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import Onboarding from "./(onboarding)";

const index = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Onboarding />
    </>
  );
};

export default index;

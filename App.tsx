import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainTabsLayout from "./src/navigation/mainTabs";
import { background } from "./src/theme";

const App = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: background }}
      edges={["left", "right"]}
    >
      <NavigationContainer children={<MainTabsLayout />}>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

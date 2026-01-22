import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "./homeStack";
import MenuScreen from "./menu";
import MyFavoriteScreen from "./my-favorite";
import ProfileScreen from "./profile";

const Tabs = createBottomTabNavigator();
const MainTabsLayout = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-favorite"
        component={MyFavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainTabsLayout;

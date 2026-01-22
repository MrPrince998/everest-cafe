import { Colors } from '@/constants/theme'
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import React from 'react'
import HomeScreen from './index'
import MenuScreen from './menu'
import MyFavoriteScreen from './my-favorite'
import ProfileScreen from './profile'


const Tabs = createNativeBottomTabNavigator();
const MainTabsLayout = () => {
  return (
    <Tabs.Navigator
    screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
    }}
    >
        <Tabs.Screen name='Home' component={HomeScreen}  />
        <Tabs.Screen name='menu' component={MenuScreen} />
        <Tabs.Screen name='my-favorite' component={MyFavoriteScreen} />
        <Tabs.Screen name='profile' component={ProfileScreen} />
    </Tabs.Navigator>
  )
}

export default MainTabsLayout
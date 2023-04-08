import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import constants from '../utility/constants';
import global from '../utility/global';
import DashboardStack from './main/DashboardStack';
import styles from '../styles/styles';
import SettingsStack from './main/SettingsStack';


const getTabBarIcon = (route, focused, color) => {
  if (route.name === 'DashboardStack') {
    return global.drawIcon(constants.IC_FEATHER, 'home', 35, color);
  } else if (route.name === 'UploadImageStack') {
    return global.drawIcon(
      constants.IC_MATERIAL_COMMUNITY,
      'camera',
      26,
      color,
    );
  } else if (route.name === 'ForumStack') {
    return global.drawIcon(
      constants.IC_MATERIAL_COMMUNITY,
      'comment',
      26,
      color,
    );
  } else if (route.name === 'SettingsStack') {
    return global.drawIcon(constants.IC_MATERIAL, 'settings', 26, color);
  } else if (route.name === 'WeatherStack') {
    return global.drawIcon(constants.IC_MATERIAL, 'sun', 26, color);
  }
};

const Tab = createBottomTabNavigator();

const bottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => getTabBarIcon(route, focused, color),
        tabBarActiveTintColor: colors.PRIMARY,
        tabBarInactiveTintColor: colors.GREY,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.bottomTabBarStyle,
      })}
      initialRouteName="DashboardStack">
      <Tab.Screen name={'DashboardStack'} component={DashboardStack} />
      <Tab.Screen name={'SettingsStack'} component={SettingsStack} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'MainScreen'} component={bottomTabNavigator} />
    </Stack.Navigator>
  );
}

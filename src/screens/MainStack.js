import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import constants from '../utility/constants';
import global from '../utility/global';
import DashboardStack from './main/DashboardStack';
import styles from '../styles/styles';
import SettingsStack from './main/SettingsStack';
import UpdatesStack from './main/UpdatesStack';
import MapStack from './main/MapStack';

const getTabBarIcon = (route, focused, color) => {
  if (route.name === 'DashboardStack') {
    return global.drawIcon(constants.IC_FEATHER, 'home', 26, color);
  } else if (route.name === 'SettingsStack') {
    return global.drawIcon(constants.IC_MATERIAL, 'settings', 26, color);
  } else if (route.name === 'UpdatesStack') {
    return global.drawIcon(constants.IC_MATERIAL, 'activity', 26, color);
  } else if (route.name === 'MapStack') {
    return global.drawIcon(constants.IC_MATERIAL, 'map', 26, color);
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
      <Tab.Screen name={'MapStack'} component={MapStack} />
      <Tab.Screen name={'UpdatesStack'} component={UpdatesStack} />
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

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import styles from '../../styles/styles';
import Dashboard from './screens/Dashboard';
import DashboardUser from './screens/DashboardUser';
import AddFlag from './screens/AddFlag';

const Stack = createNativeStackNavigator();
const tabHiddenRoutes = [];

export default function DashboardStack({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({
        tabBarStyle: [styles.bottomTabBarStyle, {display: 'none'}],
      });
    } else {
      navigation.setOptions({
        tabBarStyle: [styles.bottomTabBarStyle, {display: 'flex'}],
      });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="DashboardUser" component={DashboardUser} />
      <Stack.Screen name="AddFlag" component={AddFlag} />
    </Stack.Navigator>
  );
}

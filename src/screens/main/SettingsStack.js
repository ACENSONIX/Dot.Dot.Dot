import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import styles from '../../styles/styles';
import Settings from './screens/Settings';
import ChooseLanguage from '../onBoard/ChooseLanguage';
import CheckEmployee from './screens/settings/CheckEmployee';
import AddNewEmployee from './screens/settings/AddNewEmployee';
import EmployeeDetails from './screens/settings/EmployeeDetails';

const Stack = createNativeStackNavigator();
const tabHiddenRoutes = ['CheckEmployee','ChooseLanguage','AddNewEmployee','EmployeeDetails'];

export default function SettingsStack({navigation, route}) {
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
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CheckEmployee" component={CheckEmployee} />
      <Stack.Screen name="AddNewEmployee" component={AddNewEmployee} />
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
      <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
    </Stack.Navigator>
  );
}

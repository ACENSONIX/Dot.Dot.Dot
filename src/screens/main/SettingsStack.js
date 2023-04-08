import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import styles from '../../styles/styles';
import Settings from './screens/Settings';
import SubscribeNewExpert from './screens/settings/SubscribeNewExpert';
import CurrentPlan from './screens/settings/CurrentPlan';

const Stack = createNativeStackNavigator();
const tabHiddenRoutes = ['SubscribeNewExpert', 'CurrentPlan'];

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
      <Stack.Screen name="SubscribeNewExpert" component={SubscribeNewExpert} />
      <Stack.Screen name="CurrentPlan" component={CurrentPlan} />
    </Stack.Navigator>
  );
}

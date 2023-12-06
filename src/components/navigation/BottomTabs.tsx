import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigator } from '..';
import { Profile, Permissions, Payroll, Birthdays } from '../../screens';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Profile'
      screenOptions={{ headerShown: false }}
      tabBar={props => <BottomTabNavigator {...props} />}
    >
      <Tab.Screen 
        name='Profile'
        component={Profile}
      />
      <Tab.Screen 
        name='Permissions'
        component={Permissions}
      />
      <Tab.Screen 
        name='Payroll'
        component={Payroll}
      />
      <Tab.Screen 
        name='Birthdays'
        component={Birthdays}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
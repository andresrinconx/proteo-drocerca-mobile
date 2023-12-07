import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigator } from '..';
import { Profile, Payroll, Birthdays, Permissions } from '../../screens';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Profile'
      tabBar={props => <BottomTabNavigator {...props} />}
      screenOptions={{ 
        tabBarHideOnKeyboard: true,
        tabBarStyle: [{ display: 'flex' }, null],
        headerShown: false 
      }}
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
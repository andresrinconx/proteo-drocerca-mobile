import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigator } from '../components';
import { Profile, Permissions, Payroll, Birthdays } from '../screens';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Profile'
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabNavigator {...props} />}
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

export default HomeTabs;
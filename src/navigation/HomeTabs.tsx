import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigator } from '../components';
import { Profile, Permissions } from '../screens';

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
        component={Profile}
      />
      <Tab.Screen 
        name='Birthdays'
        component={Permissions}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
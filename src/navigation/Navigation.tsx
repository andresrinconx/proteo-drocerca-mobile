import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BootSplash from 'react-native-bootsplash';
import { RootStackParams } from '../interfaces/navigation';
import { useAuth } from '../hooks';
import { TabNavigator } from '../components';
import { Login, Profile, Permissions } from '../screens';

const Stack = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator();

// Home Screen Navigation
const HomeScreen = () => {
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
        name='Solicitudes'
        component={Profile}
      />
      <Tab.Screen 
        name='Nómina'
        component={Permissions}
      />
    </Tab.Navigator>
  );
};

// Main Navigation
const Navigation = () => {
  const { auth: { status } } = useAuth();

  if (status === 'checking') {
    return null;
  } else {
    BootSplash.hide({ fade: true });
  }

  return (
    <Stack.Navigator 
      initialRouteName={status === 'authenticated' ? 'Home' : 'Login'} 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={Login} options={{}} />
      <Stack.Screen name='Home' component={HomeScreen} options={{}} />
    </Stack.Navigator>
  );
};

export default Navigation;
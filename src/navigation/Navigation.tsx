import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import { RootStackParams } from '../ts/navigation';
import { useAuth } from '../hooks';
import { Login } from '../screens';
import HomeTabs from './HomeTabs';

const Stack = createNativeStackNavigator<RootStackParams>();

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
      <Stack.Screen name='Home' component={HomeTabs} options={{}} />
    </Stack.Navigator>
  );
};

export default Navigation;
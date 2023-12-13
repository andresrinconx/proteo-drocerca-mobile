import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import { RootStackParams } from '../../ts/navigation';
import { useAuth } from '../../hooks';
import { EditPermission, Login, NewPermission } from '../../screens';
import BottomTabs from './BottomTabs';

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
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Home' component={BottomTabs} />
      <Stack.Screen name='NewPermission' component={NewPermission} options={{ animation: 'fade_from_bottom' }} />
      <Stack.Screen name='EditPermission' component={EditPermission} options={{ animation: 'fade_from_bottom' }} />
    </Stack.Navigator>
  );
};

export default Navigation;
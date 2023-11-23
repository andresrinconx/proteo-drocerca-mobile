import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getDataStorage } from '../../utils/asyncStorage';
import { MyUser } from '../../utils/types';
import { useLogin } from '../../hooks';
import { TabNavigator } from '..';
import { Login, Profile, Permissions } from '../../views';

const Stack = createNativeStackNavigator();
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
  const [loading, setLoading] = useState(true);
  const { setMyUser, myUser } = useLogin();

  // Get storage
  useEffect(() => {
    const getStorage = async () => {
      try {
        // myUser
        const myUserStorage = await getDataStorage('myUser');
        const userData = JSON.parse(myUserStorage as string) as MyUser;
        const myUser = userData.sede ? userData : { cedula: '', codigo: '', conexion: '', sede: '' };
        setMyUser(myUser);
  
        // go to screen
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getStorage();
  }, []);

  return (
    <>
      {!loading && (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={myUser.cedula ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} options={{}} />
            <Stack.Screen name='Home' component={HomeScreen} options={{}} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default Navigation;
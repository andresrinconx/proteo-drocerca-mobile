import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useLogin from '../hooks/useLogin'
import { LoadingLogoScreen } from '../components'
import { Login, Home } from '../views'
import { getDataStorage } from '../utils/asyncStorage'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const [loading, setLoading] = useState(true)
  const { login, setLogin, setMyUser } = useLogin()

  useEffect(() => {
    const getStorage = async () => {
      const loginStorage = await getDataStorage('login')
      const myUserStorage = await getDataStorage('myUser')

      setLogin(loginStorage === 'true' ? true : false)
      setMyUser(myUserStorage ? JSON.parse(myUserStorage) : {})

      // go to screen
      setLoading(false)
    }
    getStorage()
  }, [])

  return (
    <>
      {loading ? (
        <LoadingLogoScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={login ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} options={{}} />
            <Stack.Screen name='Home' component={Home} options={{}} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}

export default Navigation
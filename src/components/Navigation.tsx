import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getDataStorage } from '../utils/asyncStorage'
import { useLogin } from '../hooks'
import { LoadingLogoScreen } from '../components'
import { Login, Home } from '../views'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const [loading, setLoading] = useState(true)
  const { setMyUser, myUser } = useLogin()

  useEffect(() => {
    const getStorage = async () => {
      const myUserStorage = await getDataStorage('myUser')

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
          <Stack.Navigator initialRouteName={myUser ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} options={{}} />
            <Stack.Screen name='Home' component={Home} options={{}} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}

export default Navigation
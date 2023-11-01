import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getDataStorage } from '../utils/asyncStorage'
import { MyUser } from '../utils/types'
import { useLogin } from '../hooks'
import { LoadingLogoScreen } from '../components'
import { Login, Home } from '../views'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const [loading, setLoading] = useState(true)
  const { setMyUser, myUser } = useLogin()

  useEffect(() => {
    const getStorage = async () => {
      try {
        // myUser
        const myUserStorage = await getDataStorage('myUser')
        const userData = JSON.parse(myUserStorage as string) as MyUser
        const myUser = userData.sede ? userData : { cedula: '', conexion: '', sede: '' }
        setMyUser(myUser)
  
        // go to screen
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getStorage()
  }, [])

  return (
    <>
      {loading ? (
        <LoadingLogoScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={myUser.cedula ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login} options={{}} />
            <Stack.Screen name='Home' component={Home} options={{}} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}

export default Navigation
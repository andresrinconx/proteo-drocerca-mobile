import { useState } from 'react'
import { View, Text } from 'react-native'
import { fetchLogin } from '../utils/api'
import { useNavigation } from '../hooks'
import useLogin from '../hooks/useLogin'
import { setDataStorage } from '../utils/asyncStorage'

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [requiredFields, setRequiredFields] = useState(false)
  const [incorrectCredentials, setIncorrectCredentials] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(false)

  const navigation = useNavigation()
  const { setLogin, setMyUser } = useLogin()
  
  const auth = async () => {
    // required fields
    if ([user, password].includes('')) {
      setRequiredFields(true)
      setIncorrectCredentials(false)
      return
    } else {
      setRequiredFields(false)
      setIncorrectCredentials(false)
      setLoadingAuth(true)
    }

    // auth
    try {
      const res = await fetchLogin({ usuario: user, password })
      
      if (res?.message) {
        setLoadingAuth(false)
        setIncorrectCredentials(true)
      } else {
        setIncorrectCredentials(false)
  
        await setDataStorage('myUser', { ...res })
        await setDataStorage('login', true)
        setMyUser({ ...res })
        setLogin(true)
  
        setLoadingAuth(false)
        setShowPassword(false)
        // navigation.navigate('Home')
        setUser('')
        setPassword('')
      }
    } catch (error) {
      setLoadingAuth(false)
      setIncorrectCredentials(true)
    }
  }

  return (
    <View>
      <Text>Hola</Text>
    </View>
  )
}

export default Login
import { View, Text } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { setDataStorage } from '../../utils/asyncStorage'
import { useLogin, useNavigation } from '../../hooks'

const LogOut = () => {
  const { setMyUser } = useLogin()
  const navigation = useNavigation()

  const logOut = async () => {
    // Restore
    setMyUser({
      cedula: '',
      conexion: '',
      sede: '',
    })
    await setDataStorage('myUser', {
      cedula: '',
      conexion: '',
      sede: '',
    })

    // Go Login
    navigation.navigate('Login')
  }

  return (
    <View>
      <Text className='text-blue bg-gray' 
        style={{ fontSize: wp(5) }}
        onPress={logOut}
      >
        Log Out
      </Text>
    </View>
  )
}

export default LogOut
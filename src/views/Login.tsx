import { useState } from 'react'
import { View, StatusBar, Image, TextInput, Text, Pressable, TouchableOpacity } from 'react-native'
import { Menu } from 'native-base'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { themeColors } from '../../tailwind.config'
import { ChevronDownIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/mini'
import { fetchLogin } from '../utils/api'
import { setDataStorage } from '../utils/asyncStorage'
import { useNavigation, useLogin } from '../hooks'
import { Loader } from '../components'

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [sede, setSede] = useState('')

  const [error, setError] = useState('')
  const [loadingAuth, setLoadingAuth] = useState(false)

  // const navigation = useNavigation()
  const { setMyUser } = useLogin()
  const { background, gray, 'light-gray': lightGray, blue } = themeColors
  const sedes = ['Mérida', 'Centro', 'Oriente']

  const auth = async () => {
    // validation
    if ([user, password, sede].includes('')) {
      setError('* Todos los campos son obligatorios')
      return
    }

    // auth
    setError('')
    setLoadingAuth(true)
    
    try {
      const res = await fetchLogin({ usuario: user, password })
      
      if (!res?.message) {
        await setDataStorage('myUser', { ...res, sede })
        setMyUser({ ...res, sede })
  
        setLoadingAuth(false)
        setShowPassword(false)
        // navigation.navigate('Home')
        setUser('')
        setPassword('')
      } else {
        setLoadingAuth(false)
        setError('* Datos incorrectos')
      }
    } catch (error) {
      setLoadingAuth(false)
      setError('* Datos incorrectos')
    }
  }

  return (
    <View className='flex-1 relative bg-background'>
      <StatusBar backgroundColor={background} barStyle='dark-content' />
      
      {/* form */}
      <View className='bg-background'>

        {/* logo */}
        <View className='flex items-center pt-10'>
          <Image style={{ width: wp(70), height: wp(20) }} resizeMode='contain'
            source={require('../public/logo.png')}
          />
        </View>

        {/* fields */}
        <View className='px-16 pt-20 space-y-10'>

          {/* user */}
          <View className='flex flex-col justify-center h-12 rounded-full bg-light-gray'>
            <TextInput className='pl-5 rounded-full text-gray' 
              style={{ fontFamily: 'Poppins-Regular', fontSize: wp(4) }}
              placeholder='Usuario'
              placeholderTextColor={gray}
              value={user}
              onChangeText={setUser}
              selectionColor={gray}
            />
          </View>

          {/* password */}
          <View className='flex flex-col justify-center h-12 rounded-full bg-light-gray'>
            <TextInput className='pl-5 rounded-full text-gray'
              style={{ fontFamily: 'Poppins-Regular', fontSize: wp(4) }}
              secureTextEntry={!showPassword}
              placeholder='Contraseña'
              placeholderTextColor={gray}
              value={password}
              onChangeText={setPassword}
              selectionColor={gray}
            />
            {!showPassword && (
              <TouchableOpacity onPress={() => setShowPassword(true)} className='absolute right-2'>
                <EyeIcon size={wp(7)} color={gray} />
              </TouchableOpacity>
            )}
            {showPassword && (
              <TouchableOpacity onPress={() => setShowPassword(false)} className='absolute right-2'>
                <EyeSlashIcon size={wp(7)} color={gray} />
              </TouchableOpacity>
            )}
          </View>

          {/* sede */}
          <View className='flex flex-col justify-center h-12 rounded-full bg-light-gray'>
            <Menu style={{ backgroundColor: lightGray, borderRadius: 20, marginTop: wp(1) }} 
              shadow={1} 
              w={wp(67)} 
              trigger={triggerProps => 
                <Pressable className='flex flex-col justify-center' 
                  style={{ height: wp(10), width: wp(66) }} 
                  {...triggerProps}
                >
                  <Text className='pl-5 font-semibold text-gray' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(4) }}>
                    {sede ? sede : 'Sede'}
                  </Text>

                  <View className='flex flex-row justify-center items-center absolute right-2 top-2'>
                    <ChevronDownIcon size={wp(6)} color={blue} strokeWidth={2} />
                  </View>
                </Pressable>
              }
            >
              {sedes.map((sede, index) => {
                const isLast = index === sedes.length - 1
                return (
                  <Menu.Item key={sede} onPress={() => setSede(sede)}
                    style={{ borderBottomWidth: isLast ? 0 : 0.3, borderBottomColor: gray }}
                  >
                    <Text className='font-normal text-gray' style={{ fontFamily: 'Poppins-Regular' }}>
                      {sede}
                    </Text>
                  </Menu.Item>
                )
              })}
            </Menu>
          </View>

          {/* error */}
          {error && (
            <View className=''>
              <Text className='text-center text-blue' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(4) }}>{error}</Text>
            </View>
          )}
        </View>
      </View>

      {/* baloon */}
      <View className='flex flex-row items-center justify-center absolute bottom-0 bg-background' style={{ width: wp(100), height: wp(30) }}>
        <View className='absolute rounded-t-full bg-blue' style={{ width: wp(150), height: wp(75) }} />

        {/* btn log in */}
        <TouchableOpacity className='flex flex-row items-center justify-center rounded-full border-[8px] border-background bg-blue' 
          onPress={() => auth()}
          style={{
            width: wp(25), 
            height: wp(25), 
            top: wp(-35),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 16.00,
            elevation: 24,
          }}
        >
          {loadingAuth ? (
            <Loader size={40} color='white' />
          ) : (
            <Image style={{ width: wp(10), height: wp(10) }} resizeMode='cover'
              source={require('../public/arrow.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login
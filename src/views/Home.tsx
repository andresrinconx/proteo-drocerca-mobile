import { useEffect } from 'react'
import { View, StatusBar, BackHandler } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { themeColors } from '../../tailwind.config'
import { LogOut } from '../components'

const Home = () => {
  const { background } = themeColors
  const { name } = useRoute()

  // Back handler
  useEffect(() => {
    if (name === 'Home') {
      const backAction = () => {
        BackHandler.exitApp()
        return true
      }
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
      return () => backHandler.remove()
    }
  }, [])

  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={background} barStyle='dark-content' />

      <LogOut />
    </View>
  )
}

export default Home
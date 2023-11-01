import { View, StatusBar } from 'react-native'
import { themeColors } from '../../tailwind.config'
import { LogOut } from '../components'

const Home = () => {
  const { background } = themeColors

  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={background} barStyle='dark-content' />

      <LogOut />
    </View>
  )
}

export default Home
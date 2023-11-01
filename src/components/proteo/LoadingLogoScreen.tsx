import { View, Image, StatusBar } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { themeColors } from '../../../tailwind.config'

const LoadingLogoScreen = () => {
  const { background } = themeColors

  return (
    <View className='flex-1 justify-center items-center bg-background'>
      <StatusBar backgroundColor={background} barStyle='dark-content' />

      <Image style={{ width: wp(40), height: wp(40) }} resizeMode='cover'
        source={require('../../public/proteo.png')}
      />
    </View>
  )
}

export default LoadingLogoScreen
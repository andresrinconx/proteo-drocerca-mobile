import { View, Image } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const LoadingLogoScreen = () => {
  return (
    <View className='flex-1 justify-center items-center bg-background'>
      <Image style={{ width: wp(40), height: wp(40) }} resizeMode='cover'
        source={require('../../public/proteo.png')}
      />
    </View>
  )
}

export default LoadingLogoScreen
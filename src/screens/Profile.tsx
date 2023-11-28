import { View, StatusBar, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { background } from '../utils/theme';
import { LogOut } from '../components';

const Profile = () => {
  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={background} barStyle='dark-content' />

      {/* logo */}
      <View className='flex flex-col justify-center items-center py-4'>
        <Image style={{ width: wp(70), height: wp(20) }} resizeMode='contain'
          source={require('../assets/drocerca.png')}
        />
      </View>

      {/* content */}
      <View>
        
      </View>
      
      <LogOut />
    </View>
  );
};

export default Profile;
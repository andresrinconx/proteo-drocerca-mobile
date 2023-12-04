import { View, StatusBar, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { blue } from '../utils/theme';
import { Container } from '../components';
// import { LogOut } from '../components';

const Profile = () => {
  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={blue} barStyle='light-content' />

      {/* <LogOut /> */}
      <View className='flex-col justify-center items-center py-4'>
        <Image style={{ width: wp(60), height: wp(20) }} resizeMode='contain'
          source={require('../assets/drocerca.png')}
        />
      </View>

      <Container />
      
    </View>
  );
};

export default Profile;
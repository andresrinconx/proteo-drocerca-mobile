import { useEffect } from 'react';
import { View, StatusBar, BackHandler, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../tailwind.config';
import { LogOut } from '../components';

const Profile = () => {
  const { background } = themeColors;
  const { name } = useRoute();

  // Back handler
  useEffect(() => {
    if (name === 'Profile') {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }
  }, []);

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
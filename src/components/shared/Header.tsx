import { Text, View, Image } from 'react-native';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Header {
  title: string;
  icon: ImageSourcePropType;
}

const Header = ({ title, icon }: Header) => {
  return (
    <>
      <View className='flex-row items-center bg-blue' style={{ height: wp(20) }}>
        <Text className='pl-4 text-white' style={{ fontFamily: 'Poppins-Bold', fontSize: wp(9) }}>
          {title}
        </Text>
      </View>
      
      <View className='absolute right-4 top-11 p-3 rounded-full bg-background'>
        <Image style={{ width: wp(10), height: wp(10) }} resizeMode='cover'
          source={icon}
        />
      </View>
    </>
  );
};

export default Header;
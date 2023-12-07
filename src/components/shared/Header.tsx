import { Text, View, Image, TouchableOpacity } from 'react-native';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '../../hooks';

interface Header {
  title: string;
  icon: ImageSourcePropType;
  isSecondary?: boolean;
}

const Header = ({ title, icon, isSecondary }: Header) => {
  const navigation = useNavigation();

  return (
    <>
      <View className='flex-row items-center bg-blue' style={{ height: wp(20) }}>
        <Text className='flex-1 pl-4 text-white' style={{ fontFamily: 'Poppins-Bold', fontSize: wp(isSecondary ? 7 : 9), textAlign: isSecondary ? 'center' : 'left' }}>
          {title}
        </Text>

        {isSecondary && (
          <TouchableOpacity onPress={() => navigation.goBack()} className='w-10 h-10 items-center justify-center absolute left-4'>
            <Image style={{ width: wp(7), height: wp(7) }} resizeMode='cover'
              source={icon}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {!isSecondary && (
        <View className='absolute right-4 top-11 p-3 rounded-full bg-background'>
          <Image style={{ width: wp(10), height: wp(10) }} resizeMode='cover'
            source={icon}
          />
        </View>
      )}
    </>
  );
};

export default Header;
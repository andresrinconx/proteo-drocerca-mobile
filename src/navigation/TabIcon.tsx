import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

export interface IconData {
  translation: string;
  icon: ImageSourcePropType;
}

const iconsData: { [key: string]: IconData } = {
  profile: {
    translation: 'Perfil',
    icon: require('../assets/profile.png'),
  },
  permissions: {
    translation: 'Permisos',
    icon: require('../assets/profile.png'),
  },
  payroll: {
    translation: 'Nómina',
    icon: require('../assets/profile.png'),
  },
  birthdays: {
    translation: 'Cumples',
    icon: require('../assets/profile.png'),
  }
};

const TabIcon = ({ route, isFocused, isLast }: { route: string; isFocused: boolean, isLast: boolean }) => {
  return (
    <View className='flex-col items-center justify-center'
      style={{ borderRightWidth: isLast ? 0 : .5, borderRightColor: 'white' }}
    >
      <Image style={{ width: wp(7), height: wp(7) }} resizeMode='cover'
        source={iconsData[route.toLowerCase()].icon}
      />
      {isFocused && (
        <Text className='text-[9.5px] text-white' style={{ fontFamily: 'Poppins-Regular' }}>
          {iconsData[route.toLowerCase()].translation}
        </Text>
      )}
    </View>
  );
};

export default TabIcon;
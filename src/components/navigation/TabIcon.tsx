import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IconData } from '../../utils/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconData: { [key: string]: IconData } = {
  profile: {
    translation: 'Perfil',
    icon: require('../../assets/profile.png'),
  },
  permissions: {
    translation: 'Permisos',
    icon: require('../../assets/profile.png'),
  },
  solicitudes: {
    translation: 'Solicitudes',
    icon: require('../../assets/profile.png'),
  },
  nómina: {
    translation: 'Nómina',
    icon: require('../../assets/profile.png'),
  }
};

const Icon = ({ route, isFocused, isLast }: { route: string; isFocused: boolean, isLast: boolean }) => {
  return (
    <View className='flex flex-col items-center justify-center'
      style={{ borderRightWidth: isLast ? 0 : .5, borderRightColor: 'white' }}
    >
      <Image style={{ width: wp(7), height: wp(7) }} resizeMode='cover'
        source={iconData[route.toLowerCase()].icon}
      />
      {isFocused && (
        <Text className='text-[9.5px] text-white' style={{ fontFamily: 'Poppins-Regular' }}>
          {iconData[route.toLowerCase()].translation}
        </Text>
      )}
    </View>
  );
};

const TabIcon = ({ route, isFocused, isLast }: { route: string; isFocused: boolean, isLast: boolean }) => {
  const renderIcon = (route: string, isFocused: boolean) => {
    switch (route) {
      case 'Profile':
       return <Icon route={route} isFocused={isFocused} isLast={isLast} />;
      case 'Permissions':
       return <Icon route={route} isFocused={isFocused} isLast={isLast} />;
      case 'Solicitudes':
       return <Icon route={route} isFocused={isFocused} isLast={isLast} />;
      case 'Nómina':
       return <Icon route={route} isFocused={isFocused} isLast={isLast} />;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default TabIcon;
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { iconsData } from '../utils/constants';

const TabIcon = ({ route, isFocused, isLast }: { route: string; isFocused: boolean, isLast: boolean }) => {
  return (
    <View className='flex flex-col items-center justify-center'
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
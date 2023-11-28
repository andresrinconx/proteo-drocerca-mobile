import { View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAuth } from '../../hooks';

const LogOut = () => {
  const { logOut } = useAuth();

  return (
    <View>
      <Text className='text-blue bg-gray' 
        style={{ fontFamily: 'Poppins-Regular', fontSize: wp(5) }}
        onPress={logOut}
      >
        Log Out
      </Text>
    </View>
  );
};

export default LogOut;
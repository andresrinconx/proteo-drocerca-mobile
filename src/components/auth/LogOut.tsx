import { View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { setDataStorage } from '../../utils/asyncStorage';
import { useLogin, useNavigation } from '../../hooks';
import { fetchLogOut } from '../../utils/api';

const LogOut = () => {
  const { setMyUser, myUser: { codigo } } = useLogin();
  const navigation = useNavigation();

  const logOut = async () => {
    // restore
    setMyUser({
      cedula: '',
      codigo: '',
      conexion: '',
      sede: '',
    });
    await setDataStorage('myUser', {
      cedula: '',
      codigo: '',
      conexion: '',
      sede: '',
    });

    // update db
    await fetchLogOut(`${codigo}`);

    // go Login
    navigation.navigate('Login');
  };

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
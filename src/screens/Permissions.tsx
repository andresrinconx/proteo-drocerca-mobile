import { View, StatusBar } from 'react-native';
import { Fab } from 'native-base';
import { PlusIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { blue } from '../utils/theme';
import { Header, PermissionsTobTabs } from '../components';
import { useNavigation } from '../hooks';

const Permissions = () => {
  const navigation = useNavigation();

  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={blue} barStyle='light-content' />

      <Header title='Permisos' icon={require('../assets/permissions-blue.png')} />
      
      <PermissionsTobTabs />

      <Fab 
        onPress={() => navigation.navigate('NewPermission')}
        bgColor={blue}
        renderInPortal={false} 
        shadow={4} 
        size='lg' 
        icon={<PlusIcon size={wp(8)} color='white' />} 
      />
    </View>
  );
};

export default Permissions;
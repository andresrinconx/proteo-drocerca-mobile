import { View, StatusBar } from 'react-native';
import { blue } from '../utils/theme';
import { Header, PermissionsTobTabs } from '../components';

const Permissions = () => {
  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={blue} barStyle='light-content' />

      <Header title='Permisos' icon={require('../assets/profile.png')} />
      
      <PermissionsTobTabs />
    </View>
  );
};

export default Permissions;
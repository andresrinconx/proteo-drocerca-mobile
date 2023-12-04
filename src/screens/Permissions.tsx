import { View, StatusBar } from 'react-native';
import { blue } from '../utils/theme';

const Permissions = () => {
  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={blue} barStyle='light-content' />

      
    </View>
  );
};

export default Permissions;
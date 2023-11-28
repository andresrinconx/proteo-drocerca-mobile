import { View, StatusBar } from 'react-native';
import { background } from '../utils/theme';

const Permissions = () => {
  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={background} barStyle='dark-content' />

      
    </View>
  );
};

export default Permissions;
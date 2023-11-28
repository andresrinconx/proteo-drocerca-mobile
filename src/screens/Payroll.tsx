import { View, StatusBar } from 'react-native';
import { background } from '../utils/theme';

const Payroll = () => {
  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={background} barStyle='dark-content' />

      
    </View>
  );
};

export default Payroll;
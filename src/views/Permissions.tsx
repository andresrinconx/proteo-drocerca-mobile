import { View, StatusBar } from 'react-native';
import { themeColors } from '../../tailwind.config';

const Permissions = () => {
  const { background } = themeColors;

  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={background} barStyle='dark-content' />

      
    </View>
  );
};

export default Permissions;
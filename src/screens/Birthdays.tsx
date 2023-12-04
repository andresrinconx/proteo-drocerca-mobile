import { View, StatusBar } from 'react-native';
import { blue } from '../utils/theme';
import { Calendar, Header } from '../components';

const Birthdays = () => {
  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={blue} barStyle='light-content' />

      <Header title='Cumpleaños' icon={require('../assets/profile.png')} />

      {/* calendar */}
      <Calendar />

      {/* birthday list */}
      
    </View>
  );
};

export default Birthdays;
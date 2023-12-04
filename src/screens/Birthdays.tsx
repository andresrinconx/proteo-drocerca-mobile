import { View, StatusBar } from 'react-native';
import { blue } from '../utils/theme';
import { NextBirthdays, Calendar, Header, Loader } from '../components';
import { useBirthdays } from '../hooks';

const Birthdays = () => {
  const { dayInText, monthInText, calendarDays, nextBirthdays, loading } = useBirthdays();

  return (
    <View className='flex-1 bg-background'>
      <StatusBar backgroundColor={blue} barStyle='light-content' />

      <Header title='Cumpleaños' icon={require('../assets/profile.png')} />

      {loading ? (
        <View className='mt-10'>
          <Loader />
        </View>
      ) : (
        <>
          <Calendar 
            dayInText={dayInText} 
            monthInText={monthInText} 
            calendarDays={calendarDays}        
          />
          <NextBirthdays
            nextBirthdays={nextBirthdays}
          />
        </>
      )}

    </View>
  );
};

export default Birthdays;
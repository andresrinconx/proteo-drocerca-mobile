import { View, FlatList, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { shadow } from '../../utils/theme';
import { NextBirthday } from '../../ts/birthdays';
import { calcDifferenceDays } from '../../utils/dates';

const NextBirthdays = ({ nextBirthdays }: { nextBirthdays: NextBirthday[] | null }) => {
  return (
    <View className='h-full mt-5 pt-7 px-10 bg-light-gray'
      style={{ 
        ...shadow, 
        borderTopLeftRadius: wp(16), 
        borderTopRightRadius: wp(16) 
      }}
    >
      {nextBirthdays?.length === 0 ? (
        <View className='items-center justify-center'>
          <Text className='text-center text-typography' style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp(4.5) }}>
            No hay cumpleaños en los próximos días.
          </Text>
        </View>
      ) : (
        <FlatList
          data={nextBirthdays}
          numColumns={1}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: { name, difference } }) => {
            const { day, dayOfWeek } = calcDifferenceDays(difference);

            return (
              <View className='flex-row items-center gap-x-4'>
                <View className='flex-col items-center'>
                  <Text className='-mb-3.5 text-blue' style={{ fontFamily: 'Poppins-Bold', fontSize: wp(4) }}>
                    {dayOfWeek.substring(0, 2)}
                  </Text>

                  <Text className='text-blue' style={{ fontFamily: 'Poppins-ExtraBold', fontSize: wp(7) }}>
                    {day}
                  </Text>
                </View>

                <Text className='text-typography' style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp(4) }}>
                  {name}
                </Text>
              </View>
            );
          }} 
        />
      )}
    </View>
  );
};

export default NextBirthdays;
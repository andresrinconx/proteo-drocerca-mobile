import { Text, View, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Popover } from 'native-base';
import { blue, gray } from '../../utils/theme';
import { days } from '../../utils/constants';
import { CalendarDay } from '../../ts/birthdays';

interface Calendar {
  dayInText: string;
  monthInText: string;
  calendarDays: CalendarDay[] | null;
}

const Calendar = ({ dayInText, monthInText, calendarDays }: Calendar) => {
  return (
    <View className='pt-8 px-2.5'>

      {/* current month */}
      <Text className='text-center text-gray' style={{ fontFamily: 'Poppins-Medium', fontSize: wp(5) }}>
        {monthInText}
      </Text>

      {/* days */}
      <View className='flex flex-row justify-center items-center mt-4'>
        {days.map((item, index) => (
          <Text key={index} className='uppercase text-center'
            style={{ 
              fontFamily: 'Poppins-SemiBold',
              fontSize: wp(2.4), 
              color: item === dayInText ? blue : gray,
              width: wp(13.5) 
            }}
          >
            {item}
          </Text>
        ))}
      </View>

      {/* grid */}
      <View className='border-[0.5px] mt-0.5 border-gray'>
        <FlatList
          data={calendarDays}
          numColumns={7}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: { isCurrentMonth, day, birthdays }, index }) => {
            return (
              <>
                {!isCurrentMonth ? (
                  <View key={index} className='p-0.5 border-[0.5px] border-gray bg-light-gray'
                    style={{ 
                      width: wp(13.5), 
                      height: wp(15), 
                    }}
                  />
                ) : (
                  birthdays.length > 0 ? (
                    <Popover trigger={triggerProps => {
                     return <Text {...triggerProps}>
                              <View className='flex-col p-0.5 border-[0.5px] border-gray'
                                style={{ 
                                  width: wp(13.5), 
                                  height: wp(15), 
                                }}
                              >
                                <CircleDay day={Number(day)} />
                                <View className='flex-row justify-center'>
                                  <Image style={{ width: wp(7), height: wp(7) }} resizeMode='cover'
                                    source={require('../../assets/proteo.png')}
                                  />
                                </View>
                              </View>
                            </Text>;
                    }}>
                      <Popover.Content className='bg-blue border-blue p-2'>
                        <FlatList
                          data={birthdays}
                          numColumns={1}
                          showsVerticalScrollIndicator={false}
                          renderItem={({ item }) => {
                            return <Text className='text-white' style={{ fontFamily: 'Poppins-Semibold', fontSize: wp(4) }}>{item}</Text>;
                          }} 
                        />
                      </Popover.Content>
                    </Popover>
                  ) : (
                    <View key={index} className='p-0.5 border-[0.5px] border-gray bg-background'
                      style={{ 
                        width: wp(13.5), 
                        height: wp(15), 
                      }}
                    >
                      <CircleDay day={Number(day)} />
                    </View>
                  )
                )}
              </>
            );
          }} 
        />
      </View>
    </View>
  );
};

const CircleDay = ({ day }: { day: number }) => {
  return (
    <Text className='w-4 h-4 text-center rounded-full' 
      style={{ 
        fontFamily: 'Poppins-Regular', 
        fontSize: wp(2.5),
        backgroundColor: day === new Date().getDate() ? blue : 'white',
        color: day === new Date().getDate() ? 'white' : gray
      }}
    >{day}</Text>
  );
};

export default Calendar;
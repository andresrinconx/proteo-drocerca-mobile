import { View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Payroll } from '../../ts/payroll';
import Table from '../shared/Table';
import { lightGray } from '../../utils/theme';
import { getCurrency } from '../../utils/strings';

const PayrollDetails = ({ item }: { item: Payroll}) => {
  const currency = 'Bs.';

  const conceptWidth = 36;
  const assignmentWidth = 16;
  const deductionWidth = 16;
  const paidWidth = 14;

  return (
    <View>
      {/* date and number */}
      <View className='flex-row items-center justify-between m-4'>
        <Text className='text-blue' style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp(5) }}>{item?.date}{' '}
          <Text className='text-gray' style={{ fontFamily: 'Poppins-Regular', fontSize: wp(4.5) }}>- {item?.number}</Text>
        </Text>
      </View>
      
      {/* details */}
      <View className='items-center'>
        <Table
          columns={[
            { name: 'concept', width: 36 },
            { name: 'assignment', width: assignmentWidth, type: 'currency' },
            { name: 'deduction', width: deductionWidth, type: 'currency' },
            { name: 'paid', width: paidWidth, type: 'currency' },
          ]}
          data={item?.items}
          currency={currency}
        />

        <View className='flex-row'>
          <View className='mx-2.5' style={{ width: wp(conceptWidth) }} />
          <View className='flex-row items-center border-t border-t-blue'
            style={{ 
              height: wp(10),
              backgroundColor: lightGray,
              borderBottomRightRadius: wp(3),
              borderBottomLeftRadius: wp(3),
            }}
          >
            <Text className='mx-1 text-center' style={{ width: wp(assignmentWidth), fontFamily: 'Poppins-Regular', fontSize: wp(2.8) }}>
              {getCurrency(currency, item?.assignment)}
            </Text>
            <Text className='mx-1 text-center' style={{ width: wp(deductionWidth), fontFamily: 'Poppins-Regular', fontSize: wp(2.8) }}>
              {getCurrency(currency, item?.deduction)}
            </Text>
            <Text className='mx-1 text-center' style={{ width: wp(paidWidth), fontFamily: 'Poppins-Regular', fontSize: wp(2.8) }}>
              {getCurrency(currency, item?.paid)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PayrollDetails;
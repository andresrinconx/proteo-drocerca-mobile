import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TableSkeleton = () => (
  <View className='mt-1.5 overflow-hidden'>
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </View>
);

const SkeletonRow = () => (
  <View className='flex-row items-center space-x-2 my-1.5'>
    <View className='rounded-lg bg-light-blue' style={{ width: wp(15), height: wp(4) }} />
    <View className='rounded-lg bg-light-blue' style={{ width: wp(20), height: wp(4) }} />
    <View className='rounded-lg bg-light-blue' style={{ width: wp(30), height: wp(4) }} />
    <View className='rounded-lg bg-light-blue' style={{ width: wp(16), height: wp(4) }} />
  </View>
);

export default TableSkeleton;
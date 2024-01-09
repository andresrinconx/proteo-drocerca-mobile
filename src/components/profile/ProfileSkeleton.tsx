import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ProfileSkeleton = () => {
  return (
    <View className='flex-col items-center pt-14 overflow-hidden'>
      {/* profile data */}
      <View className='flex-col gap-y-4 mb-10'>
        <View className='flex-row items-center gap-x-4'>
          <View className='rounded-full bg-light-blue' style={{ width: wp(14), height: wp(14) }} />

          <View className='flex-col gap-y-1'>
            <View className='rounded-lg bg-light-blue' style={{ width: wp(61), height: wp(8) }} />
            <View className='rounded-lg bg-light-blue' style={{ width: wp(61), height: wp(8) }} />
          </View>
        </View>

        <View className='flex-row items-center gap-x-4'>
          <View style={{ width: wp(14) }}/>

          <View className='flex-col gap-y-1'>
            <View className='flex-row justify-between' style={{ width: wp(61) }}>
              <View className='flex-row gap-x-4'>
                <View className='rounded-lg bg-light-blue' style={{ width: wp(20), height: wp(4) }} />
                <View className='rounded-lg bg-light-blue' style={{ width: wp(25), height: wp(4) }} />
              </View>
            </View>

            <View className='flex-row justify-between' style={{ width: wp(61) }}>
              <View className='flex-row gap-x-4'>
                <View className='rounded-lg bg-light-blue' style={{ width: wp(20), height: wp(4) }} />
                <View className='rounded-lg bg-light-blue' style={{ width: wp(25), height: wp(4) }} />
              </View>

              <View className='rounded-full bg-light-blue' style={{ width: wp(4), height: wp(4) }} />
            </View>

            <View className='flex-row justify-between' style={{ width: wp(61) }}>
              <View className='flex-row gap-x-4'>
                <View className='rounded-lg bg-light-blue' style={{ width: wp(20), height: wp(4) }} />
                <View className='rounded-lg bg-light-blue' style={{ width: wp(25), height: wp(4) }} />
              </View>

              <View className='rounded-full bg-light-blue' style={{ width: wp(4), height: wp(4) }} />
            </View>
          </View>
        </View>
      </View>

      {/* tabs */}
      {/* <View className='flex-col gap-y-0.5'>
        <View className='rounded-lg bg-light-blue' style={{ width: wp(30), height: wp(8) }} />
        <View className='rounded-lg bg-light-blue' style={{ width: wp(79), height: wp(79) }} />
      </View> */}
    </View>
  );
};

export default ProfileSkeleton;
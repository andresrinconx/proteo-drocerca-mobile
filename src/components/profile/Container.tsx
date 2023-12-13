import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { shadow } from '../../utils/theme';
import { fetchProfile } from '../../utils/api';
import { Profile } from '../../ts/user';
import ProfileSkeleton from './ProfileSkeleton';
import ProfileField from './ProfileField';

const Container = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await fetchProfile();
        
        if (res) {
          setProfile(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();  
  }, []);

  return (
    <View className='px-4 pt-10 bg-background'
      style={{ 
        ...shadow, 
        flex: 1, 
        borderTopLeftRadius: wp(16), 
        borderTopRightRadius: wp(16) 
      }}
    >
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          {/* profile data */}
          <View className='flex-col gap-y-4 mb-10'>
            {/* img & name */}
            <View className='flex-row items-center gap-x-4'>
              <Image style={{ width: 55, height: 55 }} resizeMode='cover'
                source={require('../../assets/profile-pencil.png')}
              />

              <View className='flex-col gap-y-1' style={{ width: wp(61) }}>
                <Text className='text-blue' style={{ fontFamily: 'Poppins-Bold', fontSize: wp(6) }}
                  numberOfLines={3}
                >
                  ¡Hola {profile?.name}!
                </Text>
              </View>
            </View>

            {/* data */}
            <View className='flex-row items-center gap-x-4'>
              <View style={{ width: wp(14) }}/>

              <View className='flex-col'>
                <ProfileField label='Cédula' value={profile?.idCard as string} />
                <ProfileField label='Télefono' value={profile?.phone as string} />
                <ProfileField label='Correo' value={profile?.email as string} />
              </View>
            </View>
          </View>

          {/* tabs */}
          <View className=''>
            
          </View>
        </>
      )}
    </View>
  );
};

export default Container;
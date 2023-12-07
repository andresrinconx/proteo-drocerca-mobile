import { View, Text } from 'react-native';
import { useToast } from 'native-base';
import { Permission } from '../ts/permissions';
import { pemissionFormDictionary } from '../utils/constants';

export const usePermission = () => {
  const toast = useToast();
  const id = 'toast';

  const createPermission = (data: Permission) => {
    const { tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita } = data;

    for (const key in pemissionFormDictionary) {
      const permissionKey = key as keyof Permission;

      if (!data[permissionKey]) {
        if (!toast.isActive(id)) {
          return toast.show({ id,
            render: () => (
              <View className='bottom-10 rounded-md' style={{ backgroundColor: '#404040' }}>
                <Text className='p-2 font-bold text-sm text-white'>
                  {(pemissionFormDictionary as Permission)[key as keyof Permission]}
                </Text>
              </View>
            )
          });
        }
      }
    }

    console.log(tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita);
  };

  return {
    createPermission
  };
};
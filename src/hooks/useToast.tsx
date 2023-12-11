import { View, Text } from 'react-native';
import { useToast as useToastNativeBase } from 'native-base';

export const useToast = () => {
  const toast = useToastNativeBase();
  const id = 'toast';
  
  const showToast = (message: string) => {
    if (message) {
      if (!toast.isActive(id)) {
        return toast.show({ 
          render: () => (
            <View className='bottom-10 rounded-md' style={{ backgroundColor: '#404040' }}>
              <Text className='p-2 font-bold text-sm text-center text-white'>
                {message}
              </Text>
            </View>  
          ),
          id
        });
      }
    }
  };

  return {
    showToast
  };
};
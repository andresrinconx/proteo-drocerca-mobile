import { View, TouchableOpacity, Text } from 'react-native';
import { blue } from '../../utils/theme';
import Loader from './Loader';

interface ButtonProps {
  bgColor?: string;
  color?: string;
  text?: string;
  fontSize?: number;
  height?: number;
  width?: number;
  opacity?: number;
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
}

const Button = ({ bgColor, color, text, fontSize, height, width, opacity, disabled, isLoading, onPress }: ButtonProps) => {
  return (
    <View className='justify-center items-center rounded-xl' 
      style={{ 
        height: height || 48, 
        width: `${width || 45}%`,
        backgroundColor: bgColor || blue,
        opacity: opacity || 1,
      }}
    >
      {isLoading ? (
        <Loader color='white' size={26} />
      ) : (
        <TouchableOpacity onPress={onPress} className='w-full' disabled={disabled || false}>
          <Text className='text-center' 
            style={{ 
              fontFamily: 'Poppins-SemiBold', 
              fontSize: fontSize || 20,
              color: color || 'white', 
            }}
          >{text || 'Ok'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Button;
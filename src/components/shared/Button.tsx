import { View, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { blue } from '../../utils/theme';

interface ButtonProps {
  bgColor?: string;
  color?: string;
  text?: string;
  fontSize?: number;
  height?: number;
  width?: number;
  onPress: () => void;
}

const Button = ({ bgColor, color, text, fontSize, height, width, onPress }: ButtonProps) => {
  return (
    <View className='justify-center items-center rounded-xl' 
      style={{ 
        height: wp(height || 12), 
        width: `${width || 45}%`,
        backgroundColor: bgColor || blue,
      }}
    >
      <TouchableOpacity onPress={onPress} className='w-full'>
        <Text className='text-center' 
          style={{ 
            fontFamily: 'Poppins-SemiBold', 
            fontSize: wp(fontSize || 5),
            color: color || 'white', 
          }}
        >{text || 'Ok'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
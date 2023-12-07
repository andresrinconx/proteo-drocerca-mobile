import { Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface HeadingProps {
  text: string;
  size: 'sm' | 'lg' | 'xl';
}

const Heading = ({ text, size }: HeadingProps) => (
  <Text className='text-blue' 
    style={{ 
      fontFamily: size === 'sm' ? 'Poppins-Medium' : size === 'lg' ? 'Poppins-Bold' : 'Poppins-ExtraBold',
      fontSize: wp(size === 'sm' ? 3.5 : size === 'lg' ? 4 : 5) 
    }}
  >{text}</Text>
);

export default Heading;
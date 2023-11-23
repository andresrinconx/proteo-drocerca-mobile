import { ActivityIndicator } from 'react-native';
import { themeColors } from '../../../tailwind.config';

const Loader = ({color, size}: {color?: string, size?: number}) => {
  const { blue } = themeColors;

  return (
    <ActivityIndicator size={size ? size : 'large'} color={`${color ? color : blue}`} />
  );
};

export default Loader;
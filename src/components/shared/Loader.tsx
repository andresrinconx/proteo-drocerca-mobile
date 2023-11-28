import { ActivityIndicator } from 'react-native';
import { blue } from '../../utils/theme';

const Loader = ({color, size}: {color?: string, size?: number}) => {
  return (
    <ActivityIndicator size={size ? size : 'large'} color={`${color ? color : blue}`} />
  );
};

export default Loader;
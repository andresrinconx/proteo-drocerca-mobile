import { useNavigation as useNavigationNative } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../interfaces/navigation';

export const useNavigation = () => useNavigationNative<NavigationProp<RootStackParams>>();
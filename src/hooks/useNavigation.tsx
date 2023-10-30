import { useNavigation as useNavigationHook } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationParamsList } from '../utils/navigationParams'

const useNavigation = () => {
  return useNavigationHook<NativeStackNavigationProp<NavigationParamsList>>()
}

export default useNavigation
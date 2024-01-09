import { Pressable } from 'react-native';
import { useAuth } from '../../hooks';
import { shadow } from '../../utils/theme';
import { ArrowLeftOnRectangleIcon } from 'react-native-heroicons/mini';

const LogOut = () => {
  const { logOut } = useAuth();

  return (
    <Pressable onPress={logOut} className='bg-blue rounded-full p-4' 
      style={{ ...shadow }}
    >
      <ArrowLeftOnRectangleIcon size={30} color='white' />
    </Pressable>
  );
};

export default LogOut;
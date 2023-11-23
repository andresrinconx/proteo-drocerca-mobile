import { useContext } from 'react';
import LoginContext from '../contexts/LoginProvider';

const useLogin = () => {
  return useContext(LoginContext);
};

export default useLogin;
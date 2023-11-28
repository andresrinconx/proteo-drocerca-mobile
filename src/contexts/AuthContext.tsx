import { createContext, useEffect, useState } from 'react';
import { getDataStorage, removeDataStorage, setDataStorage } from '../utils/asyncStorage';
import { Auth } from '../interfaces/auth';
import { fetchLogOut, fetchValidate, setBaseUrl } from '../utils/api';
import { useNavigation } from '../hooks';

interface AuthContextProps {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  logOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>({
    status: 'checking',
    isBoss: false,
  });
  const navigation = useNavigation();
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  // Check auth
  const checkAuth = async() => {
    const jwt = await getDataStorage('jwt');
    
    if (!jwt) return setAuth({...auth, status: 'notAuthenticated'});

    try {
      const sede = await getDataStorage('sede');
      setBaseUrl(sede as string);

      const res = await fetchValidate();
      await setDataStorage('jwt', res.jwt);
      setAuth({
        ...auth, 
        status: 'authenticated', 
        isBoss: res.isBoss,
      });
    } catch (error) {
      setAuth({...auth, status: 'notAuthenticated'});
    }
  };

  // Log out
  const logOut = async () => {
    setAuth({
      ...auth,
      status: 'notAuthenticated',
      isBoss: false,
    });
    await fetchLogOut();

    await removeDataStorage('jwt');
    await removeDataStorage('sede');

    navigation.navigate('Login');
  };

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      logOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
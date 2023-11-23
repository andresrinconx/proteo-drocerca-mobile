import { createContext, useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { MyUser } from '../utils/types';
import { setBaseUrl } from '../utils/api';
import { notificationListener, requestUserPermission } from '../utils/pushNotification';

const LoginContext = createContext<{
  myUser: MyUser
  setMyUser: (myUser: MyUser) => void
}>({
  myUser: { cedula: '', codigo: '', conexion: '', sede: '' },
  setMyUser: () => {
    // do nothing
  },
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [myUser, setMyUser] = useState<MyUser>({
    cedula: '',
    codigo: '',
    conexion: '',
    sede: '',
  });

  // ***********************************************
  // PERMISSIONS
  // ***********************************************

  // Notifications
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    requestUserPermission();
    notificationListener();
  }, []);

  // ***********************************************
  // SEDE
  // ***********************************************

  // Change sede to API calls
  useEffect(() => {
    if (myUser.sede) {
      setBaseUrl(myUser.sede);
    }
  }, [myUser]);

  return (
    <LoginContext.Provider value={{
      myUser,
      setMyUser,
    }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
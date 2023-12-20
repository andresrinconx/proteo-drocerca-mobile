import { createContext, useState } from 'react';
import { BossPermission, UserPermission } from '../ts/permissions';

interface ProteoContextProps {
  userPermissions: UserPermission[];
  setUserPermissions: (permissions: UserPermission[]) => void;
  bossPermissions: BossPermission[];
  setBossPermissions: (permissions: BossPermission[]) => void;
}

export const ProteoContext = createContext({} as ProteoContextProps);

export const ProteoProvider = ({ children }: { children: React.ReactNode }) => {
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);
  const [bossPermissions, setBossPermissions] = useState<BossPermission[]>([]);
  
  return (
    <ProteoContext.Provider value={{
      userPermissions,
      setUserPermissions,
      bossPermissions,
      setBossPermissions
    }}>
      {children}
    </ProteoContext.Provider>
  );
};
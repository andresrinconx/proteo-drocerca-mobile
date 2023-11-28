import { createContext, useState } from 'react';

interface ProteoContextProps {

}

export const ProteoContext = createContext({} as ProteoContextProps);

export const ProteoProvider = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    <ProteoContext.Provider value={{
      
    }}>
      {children}
    </ProteoContext.Provider>
  );
};
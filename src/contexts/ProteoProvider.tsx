import { createContext, useState } from 'react';

const ProteoContext = createContext<{
  
}>({
  
});

export const ProteoProvider = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    <ProteoContext.Provider value={{
      
    }}>
      {children}
    </ProteoContext.Provider>
  );
};

export default ProteoContext;
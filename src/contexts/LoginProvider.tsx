import { createContext, useState } from 'react'
import { MyUser } from '../utils/types'

const LoginContext = createContext<{
  myUser: MyUser
  setMyUser: (myUser: MyUser) => void
}>({
  myUser: { cedula: '', conexion: '', sede: '' },
  setMyUser: () => {
    // do nothing
  },
})

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [myUser, setMyUser] = useState<MyUser>({
    cedula: '',
    conexion: '',
    sede: '',
  })
  
  return (
    <LoginContext.Provider value={{
      myUser,
      setMyUser,
    }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext
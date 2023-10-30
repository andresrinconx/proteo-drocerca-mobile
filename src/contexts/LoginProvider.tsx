import { createContext, useState } from 'react'
import { MyUser } from '../utils/types'

const LoginContext = createContext<{
  login: boolean
  setLogin: (login: boolean) => void
  myUser: MyUser
  setMyUser: (myUser: MyUser) => void
}>({
  login: false,
  setLogin: () => { 
    // do nothing
  },
  myUser: { cedula: '', conexion: '' },
  setMyUser: () => {
    // do nothing
  },
})

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState(false)
  const [myUser, setMyUser] = useState<MyUser>({
    cedula: '',
    conexion: ''
  })
  
  return (
    <LoginContext.Provider value={{
      login,
      setLogin,
      myUser,
      setMyUser,
    }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext
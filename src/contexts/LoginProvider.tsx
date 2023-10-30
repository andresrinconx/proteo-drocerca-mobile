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
  myUser: { codigo: '', conexion: '' },
  setMyUser: () => {
    // do nothing
  },
})

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState(false)
  const [myUser, setMyUser] = useState<MyUser>({
    codigo: '',
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
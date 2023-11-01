import { createContext, useState, useEffect } from 'react'
import { MyUser } from '../utils/types'
import { apiBaseUrlSede } from '../utils/api'

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

  useEffect(() => {
    if (myUser.sede) {
      apiBaseUrlSede(myUser.sede)
    }
  }, [myUser])
  
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
import { NativeBaseProvider } from 'native-base'
import { LoginProvider } from './src/contexts/LoginProvider'
import { ProteoProvider } from './src/contexts/ProteoProvider'
import { Navigation } from './src/components'

const App = () => {
  return (
    <NativeBaseProvider>
      <LoginProvider>
        <ProteoProvider>
          <Navigation />
        </ProteoProvider>
      </LoginProvider>
    </NativeBaseProvider>
  )
}

export default App
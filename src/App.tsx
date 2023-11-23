import { NativeBaseProvider } from 'native-base';
import { LoginProvider } from './contexts/LoginProvider';
import { ProteoProvider } from './contexts/ProteoProvider';
import { Navigation } from './components';

const App = () => {
  return (
    <NativeBaseProvider>
      <LoginProvider>
        <ProteoProvider>
          <Navigation />
        </ProteoProvider>
      </LoginProvider>
    </NativeBaseProvider>
  );
};

export default App;
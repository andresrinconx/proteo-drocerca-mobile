import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './contexts/AuthContext';
import { ProteoProvider } from './contexts/ProteoContext';
import { Navigation } from './components';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthProvider>
          <ProteoProvider>
            <Navigation />
          </ProteoProvider>
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
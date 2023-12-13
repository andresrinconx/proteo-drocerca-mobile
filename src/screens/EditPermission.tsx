import { ScrollView, StatusBar } from 'react-native';
import { Header, PermissionForm } from '../components';
import { blue } from '../utils/theme';
import { useRoute } from '@react-navigation/native';

const EditPermission = () => {
  const { params: { id } } = useRoute() as { params: { id: string } };

  return (
    <ScrollView className='flex-1 bg-background' 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <StatusBar backgroundColor={blue} barStyle='light-content' />

      <Header title='Solicitud de Permiso' icon={require('../assets/arrow-left.png')} isSecondary />

      <PermissionForm 
        status='update'
        id={id}
      />
    </ScrollView>
  );
};

export default EditPermission;
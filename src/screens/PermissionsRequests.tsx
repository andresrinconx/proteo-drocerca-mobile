import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { fetchPermissions } from '../utils/api';
import { UserPermission } from '../ts/permissions';
import { Table } from '../components';
import { useNavigation, useProteo } from '../hooks';
import { socket } from '../helpers/socket';

const PermissionsRequests = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { userPermissions, setUserPermissions } = useProteo();
  const navigation = useNavigation();

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const res = await fetchPermissions();

        if (res) {
          setUserPermissions(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermissions();
  }, []);

  useEffect(() => {
    socket.on('permission to user', (data: { id: string, status: string }) => {
      setUserPermissions(userPermissions?.map(permission => permission.id === data.id ? { ...permission, status: data.status } : permission));

      // --- HERE ---

      // setUserPermissions((prevState:): UserPermission[] => (
      //   prevState ? prevState?.map(permission => permission.id === data.id ? { ...permission, status: data.status } : permission) : []
      // ));
    });
  }, [socket]);

  return (
    <View className='flex-1 items-center px-5 bg-background'>
      <Table 
        columns={[
          { name: 'date', width: 16, type: 'text' },
          { name: 'place', width: 31.5, type: 'text' },
          { name: 'status', width: 20, type: 'status',
            options: [
              { value: 'Pendiente', bgColor: '#d0d0d0', color: '#5a5a5a' },
              { value: 'Aprobado', bgColor: '#5bdb5b' },
              { value: 'Rechazado', bgColor: '#cc0424' },
            ]
          },
        ]}
        data={userPermissions as UserPermission[]}
        isLoading={isLoading}
        showHeader={false}
        showSearch={true}
        iconSearch={require('../assets/pencil-white.png')}
        onSearch={(item) => navigation.navigate('EditPermission', { id: item.id })}
      />
    </View>
  );
};

export default PermissionsRequests;
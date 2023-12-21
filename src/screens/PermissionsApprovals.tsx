import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { PermissionForm, Table } from '../components';
import { fetchBossPermissions } from '../utils/api';
import { BossPermission, PermissionToBoss } from '../ts/permissions';
import { socket } from '../helpers/socket';
import { useAuth, useProteo } from '../hooks';

const PermissionsApprovals = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { bossPermissions, setBossPermissions } = useProteo();
  const { auth: { id } } = useAuth();

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const res = await fetchBossPermissions();

        if (res) {
          setBossPermissions(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermissions();
  }, []);

  useEffect(() => {
    socket.on('permission to boss', (permission: PermissionToBoss) => {
      if (permission.bossId === id) {
        setBossPermissions((prevState: BossPermission[]) => [permission, ...prevState]);
      }
    });
  }, [socket]);

  return (
    <View className='flex-1 items-center px-5 bg-background'>
      <Table
        columns={[
          { name: 'date', width: 16, type: 'text' },
          { name: 'name', width: 31.5, type: 'text' },
          { name: 'status', width: 20, type: 'status',
            options: [
              { value: 'Por aprobar', bgColor: '#d0d0d0', color: '#5a5a5a' },
              { value: 'Aprobado', bgColor: '#5bdb5b' },
              { value: 'Rechazado', bgColor: '#cc0424' },
            ]
          },
        ]}
        data={bossPermissions as BossPermission[]}
        isLoading={isLoading}
        showHeader={false}
        minHeight={140}
        maxHeight={140}
        showSearch={true}
        renderItem={(item) => (
          <PermissionForm status='approval' id={item?.id || ''} />  
        )}
      />
    </View>
  );
};

export default PermissionsApprovals;
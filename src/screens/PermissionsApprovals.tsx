import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Table } from '../components';
import { fetchBossPermissions } from '../utils/api';
import { BossPermission } from '../ts/permissions';

const PermissionsApprovals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<BossPermission[] | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const res = await fetchBossPermissions();

        if (res) {
          setPermissions(res);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermissions();
  }, []);

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
        data={permissions as BossPermission[]}
        isLoading={isLoading}
        showHeader={false}
        showSearch={true}
        renderItem={(item) => <View></View>}
      />
    </View>
  );
};

export default PermissionsApprovals;
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Table, TableSkeleton } from '../components';
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
    <View className='flex-1 px-5 bg-background'>
      {isLoading  ? (
        <TableSkeleton />
      ) : (
        <View>
          <Table
            columns={[
              { name: 'date', width: 16 },
              { name: 'name', width: 31.5 },
              { name: 'status', width: 20, 
                type: 'status',
                options: [
                  { value: 'Por aprobar', bgColor: '#d0d0d0', color: '#5a5a5a' },
                  { value: 'Aprobado', bgColor: '#5bdb5b' },
                  { value: 'Rechazado', bgColor: '#cc0424' },
                ]
              },
            ]}
            data={permissions as BossPermission[]}
            showHeader={false}
            showSearch={true}
            renderItem={(item) => <View></View>}
          />
        </View>
      )}
    </View>
  );
};

export default PermissionsApprovals;
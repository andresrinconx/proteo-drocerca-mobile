import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { gray, typography } from '../utils/theme';
import { fetchPermissions } from '../utils/api';
import { UserPermission } from '../ts/permissions';
import { Table, TableSkeleton } from '../components';

const PermissionsRequests = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<UserPermission[] | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const res = await fetchPermissions();

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
    <View className='flex-1 px-6 bg-background'>
      {isLoading  ? (
        <TableSkeleton />
      ) : (
        <View>
          <Table 
            columns={[
              { name: 'date', width: 16 },
              { name: 'place', width: 30 },
              { name: 'status', width: 20, 
                type: 'status',
                options: [
                  { value: 'Pendiente', bgColor: '#d0d0d0', color: '#5a5a5a' },
                  { value: 'Aprobado', bgColor: '#5bdb5b' },
                  { value: 'Rechazado', bgColor: '#cc0424' },
                ]
              },
            ]}
            data={permissions as UserPermission[]}
            showHeader={false}
            showSearch={true}
            renderItem={(item) => <View></View>}
          />
        </View>
      )}
    </View>
  );
};

export default PermissionsRequests;
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PermissionsApprovals, PermissionsRequests } from '../../screens';
import PermissionsTobTabNavigator from './PermissionsTobTabNavigator';
import { useAuth } from '../../hooks';

const TopTab = createMaterialTopTabNavigator();

const PermissionsTobTabs = () => {
  const { auth: { isBoss } } = useAuth();

  return (
    <TopTab.Navigator
      tabBar={props => <PermissionsTobTabNavigator {...props} />}
    >
      <TopTab.Screen name='Solicitudes' component={PermissionsRequests} />
      {isBoss && <TopTab.Screen name='Aprobaciones' component={PermissionsApprovals} />}
    </TopTab.Navigator>
  );
};

export default PermissionsTobTabs;
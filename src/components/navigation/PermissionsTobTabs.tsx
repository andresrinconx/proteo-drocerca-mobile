import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PermissionsApprovals, PermissionsRequests } from '../../screens';
import PermissionsTobTabNavigator from './PermissionsTobTabNavigator';

const TopTab = createMaterialTopTabNavigator();

const PermissionsTobTabs = () => {
  return (
    <TopTab.Navigator
      tabBar={props => <PermissionsTobTabNavigator {...props} />}
    >
      <TopTab.Screen name='Solicitudes' component={PermissionsRequests} />
      <TopTab.Screen name='Aprobaciones' component={PermissionsApprovals} />
    </TopTab.Navigator>
  );
};

export default PermissionsTobTabs;
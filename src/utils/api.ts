import { LOCAL_API_URL_MERIDA, LOCAL_API_URL_CENTRO, LOCAL_API_URL_ORIENTE } from '@env';
import axios from 'axios';
import { getDataStorage } from './asyncStorage';
import { Login } from '../ts/user';
import { Profile } from '../ts/user';
import { MonthBirthday, NextBirthday } from '../ts/birthdays';
import { Payroll } from '../ts/payroll';
import { BossPermission, Permission, PermissionWithUser, UserPermission } from '../ts/permissions';

let apiBaseUrl: string;

export const setBaseUrl = async (sede: string) => {
  switch (sede) {
    case 'Mérida':
      apiBaseUrl = 'http://10.0.2.2:4000';
      break;
    case 'Centro':
      apiBaseUrl = LOCAL_API_URL_CENTRO;
      break;
    case 'Oriente':
      apiBaseUrl = LOCAL_API_URL_ORIENTE;
      break;
  }
};

// ***********************************************
// ENDPOINTS
// ***********************************************

// User
const authEndpoint = () => `${apiBaseUrl}/api/user/auth`;
const validateEndpoint = () => `${apiBaseUrl}/api/user/validate`;
const logOutEndpoint = () => `${apiBaseUrl}/api/user/logout`;
const profileEndpoint = () => `${apiBaseUrl}/api/user/profile`;

// Birthdays
const monthBirthdaysEndpoint = () => `${apiBaseUrl}/api/birthdays/month`;
const nextBirthdaysEndpoint = () => `${apiBaseUrl}/api/birthdays/next`;

// Payroll
const payrollEndpoint = () => `${apiBaseUrl}/api/payroll`;

// Permissions
const permissionsEndpoint = () => `${apiBaseUrl}/api/permissions`;
const permissionEndpoint = (id: string) => `${apiBaseUrl}/api/permissions/${id}`;
const bossPermissionsEndpoint = () => `${apiBaseUrl}/api/permissions/boss`;
const approvePermissionEndpoint = () => `${apiBaseUrl}/api/permissions/approve`;
const rejectPermissionEndpoint = () => `${apiBaseUrl}/api/permissions/reject`;

// ***********************************************
// API CALL
// ***********************************************

const apiCall = async <T>(endpoint: string, method: 'GET' | 'POST' | 'PUT', data?: any): Promise<T> => {
  try {
    const jwt = await getDataStorage('jwt');
    const res = await axios.request({
      method,
      url: endpoint,
      data: data ? data : { },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });
    return res.data as T;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg);
  }
};

// ***********************************************
// FUNCTIONS
// ***********************************************

// User
export const fetchAuth = (data: { user: string, password: string, fcmToken: string }) => {
  return apiCall<Login>(authEndpoint(), 'POST', data);
};
export const fetchValidate = () => {
  return apiCall<Login>(validateEndpoint(), 'GET');
};
export const fetchLogOut = () => {
  return apiCall(logOutEndpoint(), 'POST');
};
export const fetchProfile = () => {
  return apiCall<Profile>(profileEndpoint(), 'GET');
};

// Birthdays
export const fetchMonthBirthdays = () => {
  return apiCall<MonthBirthday[]>(monthBirthdaysEndpoint(), 'GET');
};
export const fetchNextBirthdays = () => {
  return apiCall<NextBirthday[]>(nextBirthdaysEndpoint(), 'GET');
};

// Payroll
export const fetchPayroll = (data: { date: string }) => {
  return apiCall<Payroll[]>(payrollEndpoint(), 'POST', data);
};

// Permissions
export const fetchPermissions = () => {
  return apiCall<UserPermission[]>(permissionsEndpoint(), 'GET');
};
export const fetchCreatePermission = (data: Permission) => {
  return apiCall(permissionsEndpoint(), 'POST', data);
};
export const fetchPermission = (id: string) => {
  return apiCall<PermissionWithUser>(permissionEndpoint(id), 'GET');
};
export const fetchUpdatePermission = (id: string, data: Permission) => {
  return apiCall(permissionEndpoint(id), 'PUT', data);
};
export const fetchBossPermissions = () => {
  return apiCall<BossPermission[]>(bossPermissionsEndpoint(), 'GET');
};
export const fetchApprovePermission = (data: { id: string }) => {
  return apiCall(approvePermissionEndpoint(), 'PUT', data);
};
export const fetchRejectPermission = (data: { id: string }) => {
  return apiCall(rejectPermissionEndpoint(), 'PUT', data);
};
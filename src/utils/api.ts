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
      apiBaseUrl = 'http://192.168.88.193:4000/api';
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
const authEndpoint = () => `${apiBaseUrl}/user/auth`;
const validateEndpoint = () => `${apiBaseUrl}/user/validate`;
const logOutEndpoint = () => `${apiBaseUrl}/user/logout`;
const profileEndpoint = () => `${apiBaseUrl}/user/profile`;

// Birthdays
const monthBirthdaysEndpoint = () => `${apiBaseUrl}/birthdays/month`;
const nextBirthdaysEndpoint = () => `${apiBaseUrl}/birthdays/next`;

// Payroll
const payrollEndpoint = () => `${apiBaseUrl}/payroll`;

// Permissions
const permissionsEndpoint = () => `${apiBaseUrl}/permissions`;
const permissionEndpoint = (id: string) => `${apiBaseUrl}/permissions/${id}`;
const bossPermissionsEndpoint = () => `${apiBaseUrl}/permissions/boss`;
const approvePermissionEndpoint = () => `${apiBaseUrl}/permissions/approve`;
const rejectPermissionEndpoint = () => `${apiBaseUrl}/permissions/reject`;

// ***********************************************
// API CALL
// ***********************************************

const apiCall = async <T>(endpoint: string, method: Uppercase<string>, data?: any): Promise<T> => {
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
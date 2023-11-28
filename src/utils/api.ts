import { LOCAL_API_URL_MERIDA, LOCAL_API_URL_CENTRO, LOCAL_API_URL_ORIENTE } from '@env';
import axios from 'axios';
import { getDataStorage } from './asyncStorage';
import { Login } from '../interfaces/api';

let apiBaseUrl: string;

export const setBaseUrl = async (sede: string) => {
  switch (sede) {
    case 'Mérida':
      apiBaseUrl = LOCAL_API_URL_MERIDA;
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

// User session
const authEndpoint = () => `${apiBaseUrl}/api/user/auth`;
const validateEndpoint = () => `${apiBaseUrl}/api/user/validate`;
const logOutEndpoint = () => `${apiBaseUrl}/api/user/logout`;

// ***********************************************
// API CALL
// ***********************************************

const apiCall = async <T>(endpoint: string, method: Uppercase<string>, data?: unknown): Promise<T> => {
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

// User session
export const fetchAuth = (data: { user: string, password: string, fcmToken: string }) => {
  return apiCall<Login>(authEndpoint(), 'POST', data);
};
export const fetchValidate = () => {
  return apiCall<Login>(validateEndpoint(), 'GET');
};
export const fetchLogOut = () => {
  return apiCall(logOutEndpoint(), 'POST');
};
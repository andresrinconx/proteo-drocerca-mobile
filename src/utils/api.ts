import { LOCAL_API_URL_MERIDA, LOCAL_API_URL_CENTRO, LOCAL_API_URL_ORIENTE } from '@env';
import axios from 'axios';

// ***********************************************
// API URL
// ***********************************************

export let apiBaseUrl: string;

export const setBaseUrl = (sede: string) => {
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
const loginEndpoint = () => `${apiBaseUrl}/api/user/login`;
const logOutEndpoint = () => `${apiBaseUrl}/api/user/logout`;

// ***********************************************
// API CALL
// ***********************************************

const apiCall = async (endpoint: string, method: Uppercase<string>, data?: unknown)=>{
  try {
    const res = await axios.request({
      method,
      url: endpoint,
      data: data ? data : { }
    });
    return res.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg);
  }
};

// ***********************************************
// FUNCTIONS
// ***********************************************

// User session
export const fetchLogin = (data: { user: string, password: string, fcmToken: string }) => {
  return apiCall(loginEndpoint(), 'POST', data);
};
export const fetchLogOut = (code: string) => {
  return apiCall(logOutEndpoint(), 'POST', { code });
};
import { API_URL_MERIDA, API_URL_CENTRO, API_URL_ORIENTE, LOCAL_API_URL_MERIDA, LOCAL_API_URL_CENTRO, LOCAL_API_URL_ORIENTE } from '@env'
import axios from 'axios'

// ***********************************************
// API URL
// ***********************************************

let apiBaseUrl: string

export const apiBaseUrlSede = (sede: string) => {
  switch (sede) {
    case 'Mérida':
      // apiBaseUrl = API_URL_MERIDA
      apiBaseUrl = LOCAL_API_URL_MERIDA
      break
    case 'Centro':
      // apiBaseUrl = API_URL_CENTRO
      apiBaseUrl = LOCAL_API_URL_CENTRO
      break
    case 'Oriente':
      // apiBaseUrl = API_URL_ORIENTE
      apiBaseUrl = LOCAL_API_URL_ORIENTE
      break
  }
}

// ***********************************************
// ENDPOINTS
// ***********************************************

const loginEndpoint = () => `${apiBaseUrl}/appPersonalUsuarios/login`

// ***********************************************
// API CALL
// ***********************************************

const apiCall = async (endpoint: string, method: Uppercase<string>, data?: unknown)=>{
  try {
    const res = await axios.request({
      method,
      url: endpoint,
      data: data ? data : { }
    })
    return res.data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg)
  }
}

// ***********************************************
// FUNCTIONS
// ***********************************************

export const fetchLogin = (data: { usuario: string, password: string }) => {
  return apiCall(loginEndpoint(), 'POST', data)
}
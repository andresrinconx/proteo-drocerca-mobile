import { LOCAL_API_URL } from '@env'
import axios from 'axios'

const apiBaseUrl = LOCAL_API_URL

export const testUrl = () => {
  return apiBaseUrl
}

// -----------------------------------------------
// ENDPOINTS
// -----------------------------------------------

const loginEndpoint = () => `${apiBaseUrl}/appPersonalUsuarios/login`

// -----------------------------------------------
// API CALL
// -----------------------------------------------

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

// -----------------------------------------------
// FUNCTIONS
// -----------------------------------------------

export const fetchLogin = (data: { usuario: string, password: string }) => {
  return apiCall(loginEndpoint(), 'POST', data)
}
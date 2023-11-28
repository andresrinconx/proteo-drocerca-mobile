import { io } from 'socket.io-client';
// import { apiBaseUrl } from './api';

// export const socket = io(apiBaseUrl);
export const socket = io('http://10.0.2.2:4000/');
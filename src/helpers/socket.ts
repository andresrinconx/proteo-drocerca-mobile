import { LOCAL_API_URL_MERIDA, LOCAL_API_URL_CENTRO, LOCAL_API_URL_ORIENTE } from '@env';
import { Socket, io } from 'socket.io-client';

export let socket: Socket;

export const setSocketUrl = async (sede: string) => {
  switch (sede) {
    case 'Mérida':
      socket = io(LOCAL_API_URL_MERIDA);
      break;
    case 'Centro':
      socket = io(LOCAL_API_URL_CENTRO);
      break;
    case 'Oriente':
      socket = io(LOCAL_API_URL_ORIENTE);
      break;
  }
};
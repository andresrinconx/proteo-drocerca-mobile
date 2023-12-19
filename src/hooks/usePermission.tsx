import { Permission } from '../ts/permissions';
import { pemissionFormDictionary } from '../utils/constants';
import { fetchCreatePermission, fetchUpdatePermission } from '../utils/api';
import { formatDate, formatHour, getDatesMs } from '../utils/dates';
import { socket } from '../helpers/socket';

export const usePermission = () => {

  // create & update
  const savePermission = async (data: Permission, id: string) => {
    const { tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita } = data;
    
    // empty fields
    for (const key in pemissionFormDictionary) {
      const permissionKey = key as keyof Permission;

      if (!data[permissionKey]) {
        throw new Error((pemissionFormDictionary as Permission)[key as keyof Permission] as string);
      }
    }

    // date validations
    const { initialDate, finalDate } = getDatesMs(finicial as Date, hsalida, ffinal as Date, hingreso);
    if (initialDate > finalDate) throw new Error('La fecha de salida no puede ser mayor a la fecha de ingreso');
    if (totald === '0') throw new Error('El total de horas no puede ser cero');

    // save permission
    const permission = {
      tiposol, 
      finicial: formatDate(finicial as Date, 'DESC'), 
      hsalida: formatHour(hsalida as Date, true), 
      ffinal: formatDate(ffinal as Date, 'DESC'), 
      hingreso: formatHour(hingreso as Date, true), 
      totald, 
      tipomot, 
      hcita: formatHour(hcita as Date, true), 
      lugar, 
      mot, 
      fsolicita: formatDate(fsolicita as Date, 'DESC'),
    };

    if (!id) {
      // create
      const permissionToBoss = await fetchCreatePermission(permission);
      socket.emit('new permission', permissionToBoss);
    } else {
      // update
      await fetchUpdatePermission(id, permission);
    }
  };

  return { savePermission };
};
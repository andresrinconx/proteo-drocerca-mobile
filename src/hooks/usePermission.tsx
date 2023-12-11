import { useToast } from '.';
import { Permission } from '../ts/permissions';
import { pemissionFormDictionary } from '../utils/constants';
import { fetchCreatePermission } from '../utils/api';
import { formatDate, formatHour } from '../utils/dates';

export const usePermission = () => {
  const { showToast } = useToast();

  // create
  const createPermission = async (data: Permission) => {
    const { tiposol, finicial, hsalida, ffinal, hingreso, totald, tipomot, hcita, lugar, mot, fsolicita } = data;

    // empty fields
    for (const key in pemissionFormDictionary) {
      const permissionKey = key as keyof Permission;

      if (!data[permissionKey]) {
        showToast((pemissionFormDictionary as Permission)[key as keyof Permission] as string);
        return;
      }
    }

    // initial date higher than final date
    const initialDate = new Date(`${(finicial as Date).toISOString().split('T')[0]}T${(hsalida as Date).toISOString().split('T')[1]}`);
    const finalDate = new Date(`${(ffinal as Date).toISOString().split('T')[0]}T${(hingreso as Date).toISOString().split('T')[1]}`);

    if (initialDate > finalDate) {
      showToast('La fecha de salida no puede ser mayor a la fecha de ingreso');
      return;
    }

    // create permission
    await fetchCreatePermission({
      tiposol: tiposol.substring(0, 1), 
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
    });
  };

  // update
  const updatePermission = async (data: Permission) => {
    // 
  };

  // approve
  const approvePermission = async (data: Permission) => {
    // 
  };

  // reject
  const rejectPermission = async (data: Permission) => {
    // 
  };

  return {
    createPermission,
    updatePermission,
    approvePermission,
    rejectPermission
  };
};
import { MonthDays } from '../ts/birthdays';
import { days, months } from './constants';

export const getDayInText = (date: Date): string => days[date.getDay()];

export const getMonthInText = (date: Date): string => months[date.getMonth()];

export const getMonthDays = (date: Date): MonthDays => {
  const monthsDays: Record<string, number> = {
    Enero: 31,
    Febrero: (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) || (date.getFullYear() % 400 === 0) ? 29 : 28,
    Marzo: 31,
    Abril: 30,
    Mayo: 31,
    Junio: 30,
    Julio: 31,
    Agosto: 31,
    Septiembre: 30,
    Octubre: 31,
    Noviembre: 30,
    Diciembre: 31,
  };

  const daysOffset: Record<string, number> = { 
    Domingo: 0,
    Lunes: 1, 
    Martes: 2,
    Miércoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sábado: 6,
  };

  const prevDays = daysOffset[getDayInText(new Date(date.getFullYear(), date.getMonth(), 1))];
  const days = monthsDays[getMonthInText(date)];
  const postDays = 7 - ((prevDays + days) % 7);
  
  return { prevDays, days, postDays };
};

export const calcDifferenceDays = (difference: number) => {
  const date = new Date();
  date.setDate(date.getDate() + difference);

  return {
    dayOfWeek: getDayInText(date),
    day: date.getDate(),
  };
};

/**
 * Get date yyyy-mm-dd
 */
export const formatDate = (date: Date, order?: 'ASC' | 'DESC'): string => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if (order === 'DESC') return `${year}-${String(month).length === 1 ? `0${month}` : `${month}`}-${String(day).length === 1 ? `0${day}` : `${day}`}`;
  return `${String(day).length === 1 ? `0${day}` : `${day}`}-${String(month).length === 1 ? `0${month}` : `${month}`}-${year}`;
};

/**
 * Get hour hh-mm
 */
export const formatHour = (date: Date, showSeconds?: boolean): string => {
  if (!date) return '';
  if (!(date instanceof Date)) return date;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (showSeconds) return `${String(hours).length === 1 ? `0${hours}` : `${hours}`}:${String(minutes).length === 1 ? `0${minutes}` : `${minutes}`}:${String(seconds).length === 1 ? `0${seconds}` : `${seconds}`}`;
  return `${String(hours).length === 1 ? `0${hours}` : `${hours}`}:${String(minutes).length === 1 ? `0${minutes}` : `${minutes}`}`;
};

/**
 * Get initial and final date in ms
 */
export const getDatesMs = (startDate: Date, startHour: Date | string, endDate: Date, endHour: Date | string) => {
  // Convert startHour to Date if it's a string
  if (typeof startHour === 'string') {
    const [hours, minutes] = startHour.split(':');
    startHour = new Date(startDate);
    startHour.setHours(Number(hours), Number(minutes), 0, 0);
  }

  // Convert endHour to Date if it's a string
  if (typeof endHour === 'string') {
    const [hours, minutes] = endHour.split(':');
    endHour = new Date(endDate);
    endHour.setHours(Number(hours), Number(minutes), 0, 0);
  }

  // Get initialDate and finalDate
  const initialDate = new Date(startDate);
  initialDate.setHours(startHour.getHours(), startHour.getMinutes(), 0, 0);

  const finalDate = new Date(endDate);
  finalDate.setHours(endHour.getHours(), endHour.getMinutes(), 0, 0);

  return { 
    initialDate: initialDate.getTime(),
    finalDate: finalDate.getTime(),
    timeDifferenceInMs: finalDate.getTime() - initialDate.getTime()
  };
};

/**
 * Return total days and hours of a permission
 */
export const calcPermissionTime = (startDate: Date, startHour: Date | string, endDate: Date, endHour: Date | string): string => {
  const { timeDifferenceInMs } = getDatesMs(startDate as Date, startHour, endDate as Date, endHour);

  const days = Math.floor(timeDifferenceInMs / (24 * 60 * 60 * 1000));
  const remainingMs = timeDifferenceInMs % (24 * 60 * 60 * 1000);

  const hours = Math.floor(remainingMs / (60 * 60 * 1000));
  const remainingMinutes = remainingMs % (60 * 60 * 1000);

  const minutes = Math.floor(remainingMinutes / (60 * 1000));

  let result = '';
  if (days > 0) {
    result += `${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) {
      result += ` y ${hours} hora${hours > 1 ? 's' : ''}`;
    }
  } else {
    if (hours > 0) {
      result += `${hours} hora${hours > 1 ? 's' : ''}`;
      if (minutes > 0) {
        result += ` y ${minutes} minuto${minutes > 1 ? 's' : ''}`;
      }
    } else {
      result += `${minutes <= 0 ? '0' : `${minutes} minuto${minutes > 1 ? 's' : ''}`}`;
    }
  }

  return result;
};
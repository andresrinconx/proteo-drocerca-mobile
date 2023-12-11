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

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (showSeconds) return `${String(hours).length === 1 ? `0${hours}` : `${hours}`}:${String(minutes).length === 1 ? `0${minutes}` : `${minutes}`}:${String(seconds).length === 1 ? `0${seconds}` : `${seconds}`}`;
  return `${String(hours).length === 1 ? `0${hours}` : `${hours}`}:${String(minutes).length === 1 ? `0${minutes}` : `${minutes}`}`;
};

/**
 * Return total days and hours of a permission
 */
export const calcPermissionTime = (startDate: Date, startHour: Date, endDate: Date, endHour: Date): string => {
  const initialDate = new Date(`${startDate.toISOString().split('T')[0]}T${startHour.toISOString().split('T')[1]}`);
  const finalDate = new Date(`${endDate.toISOString().split('T')[0]}T${endHour.toISOString().split('T')[1]}`);

  const timeDifferenceInMs = finalDate.getTime() - initialDate.getTime();

  // Calculate days, hours, and minutes
  const days = Math.floor(timeDifferenceInMs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeDifferenceInMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timeDifferenceInMs % (60 * 60 * 1000)) / (60 * 1000));

  // Build the result string
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
      result += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
  }

  return result;
};
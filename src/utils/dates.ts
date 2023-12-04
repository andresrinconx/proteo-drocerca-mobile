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
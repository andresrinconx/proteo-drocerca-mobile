import { useState, useEffect } from 'react';
import { getDayInText, getMonthDays, getMonthInText } from '../utils/dates';
import { CalendarDay } from '../ts/calendar';
import { fetchMonthBirthdays } from '../utils/api';

export const useBirthdays = () => {
  const [calendar, setCalendar] = useState<CalendarDay[] | null>(null);

  // dates
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  
  const dayInText = getDayInText(currentDate);
  const monthInText = getMonthInText(currentDate);
  const { prevDays, days, postDays } = getMonthDays(currentDate);

  const getCalendar = async () => {
    const res = await fetchMonthBirthdays();
    const calendar: CalendarDay[] = [];

    for (let i = 0; i < prevDays; i++) {
      calendar.push({
        isCurrentMonth: false,
        day: '',
        birthdays: []
      });
    }

    for (let i = 0; i < days; i++) {
      calendar.push({
        isCurrentMonth: true,
        day: String(i + 1),
        birthdays: res?.filter(item => i + 1 === Number(item.day)).map(item => item.name)
      });
    }

    for (let i = 0; i < postDays; i++) {
      calendar.push({
        isCurrentMonth: false,
        day: '',
        birthdays: []
      });
    }

    setCalendar(calendar);
  };

  useEffect(() => {
    getCalendar();
  }, []);

  return {
    dayInText,
    monthInText,
    currentDay,
    calendar
  };
};
import { useState, useEffect } from 'react';
import { getDayInText, getMonthDays, getMonthInText } from '../utils/dates';
import { CalendarDay, NextBirthday } from '../ts/birthdays';
import { fetchMonthBirthdays, fetchNextBirthdays } from '../utils/api';

export const useBirthdays = () => {
  const [loading, setLoading] = useState(true);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[] | null>(null);
  const [nextBirthdays, setNextBirthdays] = useState<NextBirthday[] | null>(null);

  // dates
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const dayInText = getDayInText(currentDate);
  const monthInText = getMonthInText(currentDate);
  const { prevDays, days, postDays } = getMonthDays(currentDate);

  const getBirthdays = async () => {
    try {
      const monthBirthdays = fetchMonthBirthdays();
      const nextBirthdays = fetchNextBirthdays();

      const resps = await Promise.all([
        monthBirthdays, 
        nextBirthdays
      ]);

      const calendarDays: CalendarDay[] = [];
  
      for (let i = 0; i < prevDays; i++) {
        calendarDays.push({
          isCurrentMonth: false,
          day: '',
          birthdays: []
        });
      }
  
      for (let i = 0; i < days; i++) {
        calendarDays.push({
          isCurrentMonth: true,
          day: String(i + 1),
          birthdays: resps[0]?.filter(item => i + 1 === Number(item.day)).map(item => item.name)
        });
      }
  
      for (let i = 0; i < postDays; i++) {
        calendarDays.push({
          isCurrentMonth: false,
          day: '',
          birthdays: []
        });
      }
  
      setCalendarDays(calendarDays);
      setNextBirthdays(resps[1]);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBirthdays();
  }, []);

  return {
    loading,
    dayInText,
    monthInText,
    currentDay,
    calendarDays,
    nextBirthdays,
  };
};
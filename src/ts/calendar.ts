export interface MonthDays {
  prevDays: number;
  days: number;
  postDays: number;
}

export interface CalendarDay {
  isCurrentMonth: boolean;
  day: string;
  birthdays: (string | null)[];
}

export interface MonthBirthdays {
  day: string;
  name: string;
}
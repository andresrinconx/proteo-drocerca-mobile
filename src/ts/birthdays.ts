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

export interface MonthBirthday {
  day: string;
  name: string;
}

export interface NextBirthday {
  difference: number;
  name: string;
}
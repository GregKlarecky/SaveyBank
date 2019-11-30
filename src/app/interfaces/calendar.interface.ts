export interface IDay {
  day: number;
  dayOfWeek: number;
  month?: number;
  year?: number;
}

export interface ICalendar {
  items: IDay[];
  name: string;
  index: number;
  year: number;
}

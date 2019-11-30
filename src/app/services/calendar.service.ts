import { Injectable } from "@angular/core";
import { ICalendar, IDay } from "../interfaces/calendar.interface";

@Injectable({
  providedIn: "root"
})
export class CalendarService {
  constructor() {}

  public daysInMonth([month, year]: number[]): number {
    return new Date(year, month, 0).getDate();
  }

  getDayOfWeek(year: number, month: number, day: number): number {
    return new Date(year, month, day).getDay();
  }

  openDate(miliseconds: number) {
    const date = new Date(miliseconds);
    const payload = { month: date.getMonth(), year: date.getFullYear() };
    return this.getDaysList(payload);
  }

  public getDaysList({ month, year }): ICalendar {
    let index = 1;

    const numberOfdays: number = this.daysInMonth([month + 1, year]);

    let daysArr: IDay[] = new Array(numberOfdays).fill(null).map(element => {
      return {
        day: index,
        dayOfWeek: this.getDayOfWeek(year, month, index++)
      };
    });

    if (daysArr[0].dayOfWeek !== 1) {
      daysArr = this.addBlankInFront(daysArr);
    }

    console.log(daysArr);
    return {
      items: daysArr,
      name: this.months[month],
      index: month,
      year: year
    };
  }

  public addBlankInFront(days: IDay[]): IDay[] {
    const numberOfBlanks: number = days[0].dayOfWeek
      ? days[0].dayOfWeek - 1
      : 6;
    const blanks: any[] = new Array(numberOfBlanks).fill({});
    days.unshift(...blanks);
    return days;
  }

  public months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decemeber"
  ];
}

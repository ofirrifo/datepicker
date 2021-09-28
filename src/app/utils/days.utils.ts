import {Day} from "../models/day.interface";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {isFunction} from "lodash";

export class DaysUtils {
  static getDays(date: any = dayjs(), disableDays: (day: Dayjs) => boolean): Day[] {
    date = date.date(1);
    const days: Day[] = [];
    for (let i = 1; i < date.day() + 1; i++) {
      days.push({
        value: null,
        date: null,
        isPrevMonthDay: true,
        disabled: true,
        isToday: false
      });
    }
    for (let i = 1; i < dayjs(date).daysInMonth() + 1; i++) {
      const _date = dayjs(date).set('date', i);
      days.push({
        value: i,
        date: _date,
        isPrevMonthDay: false,
        disabled: isFunction(disableDays) ? disableDays(_date) : false,
        isToday: dayjs().isSame(_date, 'date')
      });
    }
    return days;
  }

  static getWeekdays() {
    return ["S", "M", "T", "W", "T", "F", "S"]
  }
}

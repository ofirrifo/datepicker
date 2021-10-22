import {Dayjs} from 'dayjs';

export interface Day {
  value: number;
  date: Dayjs,
  disabled?: boolean;
  isPrevMonthDay?: boolean;
  isToday?: boolean;
}

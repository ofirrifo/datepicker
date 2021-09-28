import {Dayjs} from "dayjs";
import {Day} from "./day.interface";

export interface State {
  currentViewDate: Dayjs;
  days: Day[];
  selected: Dayjs;
  disableDays: (day: Dayjs) => boolean;
}

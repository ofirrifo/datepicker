import {Injectable} from '@angular/core';
import {DpStateService} from "./dp-state.service";
import {DaysUtils} from "../utils/days.utils";
import * as dayjs from "dayjs";
import {Day} from "../models/day.interface";

@Injectable({
  providedIn: 'root'
})
export class DpApiService {

  constructor(private dpStateService: DpStateService) {
  }

  public showToday(): void {
    const {disableDays} = this.dpStateService.getState();
    const days: Day[] = DaysUtils.getDays(disableDays);
    this.dpStateService.setDaysAndCurrentView(days, dayjs().date(1));
  }

  public unselectDate(): void {
    this.dpStateService.setSelected(void 0);
  }

  public selectToday(): void {
    const {disableDays} = this.dpStateService.getState();
    const days = DaysUtils.getDays(disableDays);
    this.dpStateService.setDaysAndCurrentView(days, dayjs().date(1));
    this.dpStateService.setSelected(dayjs());
  }

  public showSelected(): void {
    const {selected, disableDays} = this.dpStateService.getState();
    if (selected) {
      const days = DaysUtils.getDays(disableDays, selected);
      this.dpStateService.setDaysAndCurrentView(days, selected.date(1));
    }
  }

  public showPreviousMonth(): void {
    const {currentViewDate, disableDays} = this.dpStateService.getState();
    const date = currentViewDate.subtract(1, 'month');
    const days = DaysUtils.getDays(disableDays, date);
    this.dpStateService.setDaysAndCurrentView(days, date);
  }

  public showNextMonth(): void {
    const {currentViewDate, disableDays} = this.dpStateService.getState();
    const date = currentViewDate.add(1, 'month');
    const days = DaysUtils.getDays(disableDays, date);
    this.dpStateService.setDaysAndCurrentView(days, date);
  }
}

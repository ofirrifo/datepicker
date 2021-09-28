import {Component, OnDestroy, OnInit} from '@angular/core';
import {Day} from "../../models/day.interface";
import {DaysUtils} from "../../utils/days.utils";
import * as dayjs from "dayjs";
import {DpMessagesService} from "../../services/dp-messages.service";
import {filter, map, takeUntil} from "rxjs/operators";
import {Message, MessageTypes} from "../../models/message.interface";
import {Observable, Subject} from "rxjs";
import {DpStateService} from "../../services/dp-state.service";
import {State} from "../../models/state.interface";
import {Dayjs} from "dayjs";

@Component({
  selector: 'app-dp-days',
  templateUrl: './dp-days.component.html',
  styleUrls: ['./dp-days.component.scss']
})
export class DpDaysComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  days$: Observable<Day[]> = this.dpStateService.partialState$('days') as Observable<Day[]>;
  selected$: Observable<Dayjs> = this.dpStateService.partialState$('selected') as Observable<Dayjs>;
  weekdays: string[] = DaysUtils.getWeekdays();


  constructor(public dpMessagesService: DpMessagesService, private dpStateService: DpStateService) {

  }

  ngOnInit(): void {
    this.dpStateService.setDays(DaysUtils.getDays(this.dpStateService.getState().currentViewDate, this.dpStateService.getState().disableDays));
    this.dpMessagesService.message$([MessageTypes.ShowPreviousMonth, MessageTypes.ShowNextMonth]).pipe(
      takeUntil(this.destroy$)
    ).subscribe((message: Message) => {
      const date = message.type === MessageTypes.ShowPreviousMonth ? this.dpStateService.getState().currentViewDate.subtract(1, 'month') :
        this.dpStateService.getState().currentViewDate.add(1, 'month');
      this.dpStateService.setDays(DaysUtils.getDays(date, this.dpStateService.getState().disableDays));
      this.dpStateService.setCurrentView(date);
    });


    this.dpMessagesService.message$([MessageTypes.ShowToday]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.dpStateService.setDays(DaysUtils.getDays(void 0, this.dpStateService.getState().disableDays));
      this.dpStateService.setCurrentView(dayjs().date(1));
    });


    this.dpMessagesService.message$([MessageTypes.UnselectDate]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.dpStateService.setSelected(void 0);
    });


    this.dpMessagesService.message$([MessageTypes.SelectToday]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.dpStateService.setDays(DaysUtils.getDays(void 0, this.dpStateService.getState().disableDays));
      this.dpStateService.setCurrentView(dayjs().date(1));
      this.dpStateService.setSelected(dayjs());
    });

    this.dpMessagesService.message$([MessageTypes.ShowSelected]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const selected = this.dpStateService.getState().selected;
      if (selected) {
        this.dpStateService.setDays(DaysUtils.getDays(this.dpStateService.getState().selected, this.dpStateService.getState().disableDays));
        this.dpStateService.setCurrentView(this.dpStateService.getState().selected.date(1));
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

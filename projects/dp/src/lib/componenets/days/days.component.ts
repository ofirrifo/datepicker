import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Dayjs} from 'dayjs';
import {takeUntil} from 'rxjs/operators';
import { Day } from '../../models/day.interface';
import {DaysUtils} from '../../utils/days.utils';
import {MessageTypes} from '../../models/message.interface';
import {DpMessagesService} from '../../services/dp-messages.service';
import {DpStateService} from '../../services/dp-state.service';
import {DpApiService} from '../../services/dp-api.service';

@Component({
  selector: 'dp-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  days$: Observable<Day[]> = this.dpStateService.partialState$('days') as Observable<Day[]>;
  selected$: Observable<Dayjs> = this.dpStateService.partialState$('selected') as Observable<Dayjs>;
  weekdays: string[] = DaysUtils.getWeekdays();
  private readonly showPreviousMonth$ = this.dpMessagesService.message$([MessageTypes.ShowPreviousMonth]).pipe(takeUntil(this.destroy$));
  private readonly showNextMonth$ = this.dpMessagesService.message$([MessageTypes.ShowNextMonth]).pipe(takeUntil(this.destroy$));
  private readonly showToday$ = this.dpMessagesService.message$([MessageTypes.ShowToday]).pipe(takeUntil(this.destroy$));
  private readonly unselectDate$ = this.dpMessagesService.message$([MessageTypes.UnselectDate]).pipe(takeUntil(this.destroy$));
  private readonly selectToday$ = this.dpMessagesService.message$([MessageTypes.SelectToday]).pipe(takeUntil(this.destroy$));
  private readonly showSelected$ = this.dpMessagesService.message$([MessageTypes.ShowSelected]).pipe(takeUntil(this.destroy$));

  constructor(public dpMessagesService: DpMessagesService, private dpStateService: DpStateService, private dpApiService: DpApiService) {
  }

  ngOnInit(): void {
    this.initDays();
    this.subscribeToMessages();
  }

  private initDays(): void {
    const {disableDays, currentViewDate, selected} = this.dpStateService.getState();
    const _currentViewDate = selected ? selected : currentViewDate;
    const days = DaysUtils.getDays(disableDays, _currentViewDate);
    this.dpStateService.setDaysAndCurrentView(days, _currentViewDate);
  }

  private subscribeToMessages(): void {
    this.showPreviousMonth$.subscribe(() => this.dpApiService.showPreviousMonth());

    this.showNextMonth$.subscribe(() => this.dpApiService.showNextMonth());

    this.showToday$.subscribe(() => this.dpApiService.showToday());

    this.unselectDate$.subscribe(() => this.dpApiService.unselectDate());

    this.selectToday$.subscribe(() => this.dpApiService.selectToday());

    this.showSelected$.subscribe(() => this.dpApiService.showSelected());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DpMessagesService} from "../../services/dp-messages.service";
import {DpStateService} from "../../services/dp-state.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Message, MessageTypes} from "../../models/message.interface";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {DpApiService} from "../../services/dp-api.service";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [DpMessagesService, DpStateService, DpApiService]
})
export class DatepickerComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() set disableDays(disableDays: (day: Dayjs) => boolean) {
    this.dpStateService.disableDays(disableDays);
  }

  @Input() set date(dateAsISOString: string) {
    this.dpStateService.setSelected(dayjs(dateAsISOString));
  }

  @Output() datePickerReady = new EventEmitter;

  private readonly destroy$ = new Subject();
  show$ = this.dpStateService.partialState$('isDatePickerMenuOpen');

  constructor(public dpMessagesService: DpMessagesService, private dpStateService: DpStateService, private dpApiService: DpApiService) {

  }

  ngOnInit(): void {
    this.dpMessagesService.message$([MessageTypes.SelectedDateChanged]).pipe(takeUntil(this.destroy$)).subscribe((message: Message) => {
      this.dpStateService.setSelected(message.data);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.datePickerReady.emit(this.dpApiService);
  }

}

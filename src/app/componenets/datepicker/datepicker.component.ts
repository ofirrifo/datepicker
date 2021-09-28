import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DpMessagesService} from "../../services/dp-messages.service";
import {DpStateService} from "../../services/dp-state.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Message, MessageTypes} from "../../models/message.interface";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [DpMessagesService, DpStateService]
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Input() set disableDays(disableDays: (day: Dayjs) => boolean) {
    this.dpStateService.disableDays(disableDays);
  };

  @Input() set date(date) {
    this.dpStateService.setSelected(dayjs(date));
  };

  private readonly destroy$ = new Subject();

  constructor(public dpMessagesService: DpMessagesService, private dpStateService: DpStateService) {

  }

  ngOnInit(): void {
    this.dpMessagesService.message$([MessageTypes.SelectedDateChanged]).pipe(takeUntil(this.destroy$)).subscribe((message: Message) => {
      this.dpStateService.setSelected(message.data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

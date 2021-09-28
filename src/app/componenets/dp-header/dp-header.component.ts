import {Component} from '@angular/core';
import {DpMessagesService} from "../../services/dp-messages.service";
import {filter, map} from "rxjs/operators";
import {DpStateService} from "../../services/dp-state.service";
import {Dayjs} from "dayjs";

@Component({
  selector: 'app-dp-header',
  templateUrl: './dp-header.component.html',
  styleUrls: ['./dp-header.component.scss']
})
export class DpHeaderComponent {
  currentViewDate$ = this.dpStateService.partialState$('currentViewDate').pipe(
    filter((currentViewDate: Dayjs) => !!currentViewDate),
    map((currentViewDate) => {
      return `${currentViewDate.format('MMM')} ${currentViewDate.year()}`;
    }));

  constructor(public dpMessagesService: DpMessagesService, private dpStateService: DpStateService) {
  }

}

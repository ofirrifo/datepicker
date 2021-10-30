import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {Dayjs} from 'dayjs';
import {DpMessagesService} from '../../services/dp-messages.service';
import {DpStateService} from '../../services/dp-state.service';

@Component({
  selector: 'dp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  currentViewDate$ = this.dpStateService.partialState$('currentViewDate').pipe(
    filter((currentViewDate: Dayjs) => !!currentViewDate),
    map((currentViewDate) => {
      return `${currentViewDate.format('MMM')} ${currentViewDate.year()}`;
    }));

  constructor(public dpMessagesService: DpMessagesService, private dpStateService: DpStateService) {
  }

}

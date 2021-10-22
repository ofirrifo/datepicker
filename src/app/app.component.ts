import {Component} from '@angular/core';
import {Dayjs} from 'dayjs';
import * as dayjs from 'dayjs';
import {DpApiService} from './services/dp-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dpApiService: DpApiService;
  date = dayjs().toISOString();

  disableDays: (day: Dayjs) => boolean = (day: Dayjs) => {
    return day.isBefore(dayjs().subtract(1, 'month')) ||
      day.isAfter(dayjs().add(1, 'month'));
  };
}

import {Component} from '@angular/core';
import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  date = dayjs().add(2, 'month').add(1, 'day').toISOString();

  disableDays: (day: Dayjs) => boolean = (day: Dayjs) => {
    return day.isBefore(dayjs().subtract(1, 'month')) ||
      day.isAfter(dayjs().add(1, 'month'));
  }
}

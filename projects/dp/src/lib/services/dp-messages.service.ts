import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message, MessageTypes} from '../models/message.interface';
import {Dayjs} from 'dayjs';
import {filter} from 'rxjs/operators';

@Injectable()
export class DpMessagesService {
  private _message$: Subject<Message> = new Subject();
  public readonly message$ = (types: MessageTypes[]): Observable<Message> => this._message$.asObservable()
    .pipe(filter((message: Message) => types.indexOf(message.type) > -1));

  emit(message: Message): void {
    this._message$.next(message);
  }

  previousMonth(): void {
    this.emit({type: MessageTypes.ShowPreviousMonth});
  }

  nextMonth(): void {
    this.emit({type: MessageTypes.ShowNextMonth});
  }

  selectedDateChanged(selected: Dayjs): void {
    this.emit({type: MessageTypes.SelectedDateChanged, data: selected});
  }

  showToday(): void {
    this.emit({type: MessageTypes.ShowToday});
  }

  unselectDate(): void {
    this.emit({type: MessageTypes.UnselectDate});
  }

  selectToday(): void {
    this.emit({type: MessageTypes.SelectToday});
  }

  showSelected(): void {
    this.emit({type: MessageTypes.ShowSelected});
  }
}

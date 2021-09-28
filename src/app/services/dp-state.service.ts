import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {State} from "../models/state.interface";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {distinctUntilChanged, map} from "rxjs/operators";
import {cloneDeep} from "lodash";
import {Day} from "../models/day.interface";

@Injectable()
export class DpStateService {
  private state: State = {
    currentViewDate: dayjs().date(1),
    days: null,
    selected: null,
    disableDays: null
  };
  private readonly _state$ = new BehaviorSubject(this.state);
  public readonly state$ = this._state$.asObservable();
  public readonly partialState$ = (key: keyof State) => this._state$.asObservable().pipe(map((state: State) => {
    return state[key];
  }), distinctUntilChanged());

  private emit(): void {
    this._state$.next(cloneDeep(this.state));
  }

  setCurrentView(currentViewDate: Dayjs): void {
    this.state = cloneDeep({...this.state, currentViewDate});
    this.emit();
  }

  setDays(days: Day[]): void {
    this.state = cloneDeep({...this.state, days});
    this.emit();
  }

  setSelected(selected: Dayjs): void {
    this.state = cloneDeep({...this.state, selected});
    this.emit();
  }

  disableDays(disableDays: (day: Dayjs) => boolean): void {
    this.state = cloneDeep({...this.state, disableDays});
    this.emit();
  }

  getState(): State {
    return cloneDeep(this.state);
  }

}

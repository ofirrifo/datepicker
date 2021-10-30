import {NgModule} from '@angular/core';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DatepickerComponent
  ],
  exports: [
    DatepickerComponent
  ]
})
export class DpModule { }

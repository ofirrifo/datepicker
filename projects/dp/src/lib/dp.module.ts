import {NgModule} from '@angular/core';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {CommonModule} from '@angular/common';
import {DaysComponent} from './componenets/days/days.component';
import {HeaderComponent} from './componenets/header/header.component';
import {FooterComponent} from './componenets/footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DatepickerComponent,
    DaysComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    DatepickerComponent
  ]
})
export class DpModule { }

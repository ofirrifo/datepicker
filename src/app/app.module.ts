import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DatepickerComponent } from './componenets/datepicker/datepicker.component';
import { DpHeaderComponent } from './componenets/dp-header/dp-header.component';
import { DpDaysComponent } from './componenets/dp-days/dp-days.component';
import { DpFooterComponent } from './componenets/dp-footer/dp-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    DpHeaderComponent,
    DpDaysComponent,
    DpFooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

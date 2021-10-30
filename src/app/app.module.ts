import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DpModule} from '../../projects/dp/src/lib/dp.module';

@NgModule({
  imports: [
    BrowserModule,
    DpModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

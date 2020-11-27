import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { LineChartsComponent } from './dashboard/page/line-charts/line-charts.component';
import { AreaChartsComponent } from './dashboard/page/area-charts/area-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LineChartsComponent,
    AreaChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

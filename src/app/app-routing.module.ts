import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaChartsComponent } from './dashboard/page/area-charts/area-charts.component';
import { BarChartsComponent } from './dashboard/page/bar-charts/bar-charts.component';
import { LineChartsComponent } from './dashboard/page/line-charts/line-charts.component';

const routes: Routes = [
  {
    path: 'lineCharts',
    component: LineChartsComponent
  },
  {
    path: 'areaCharts',
    component: AreaChartsComponent
  },
  {
    path: 'barCharts',
    component: BarChartsComponent
  },
  {
    path: '**',
    redirectTo: 'lineCharts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

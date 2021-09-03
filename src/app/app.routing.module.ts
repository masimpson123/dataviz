import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NasaComponent } from './nasa/nasa/nasa.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'nasa', component: NasaComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// root components
// modules are already in app module so dependencies are not a concern
// we've alrady eagerly loaded everything...
import { RxjsComponent } from 'src/app/rxjs/rxjs/rxjs.component';
import { AngularComponent } from 'src/app/angular/angular/angular.component';
import { NasaComponent } from 'src/app/nasa/nasa/nasa.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'rxjs', component: RxjsComponent },
  { path: 'angular', component: AngularComponent },
  { path: 'nasa', component: NasaComponent },
  { path: '**', component: DashboardComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

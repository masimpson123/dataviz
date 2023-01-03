import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// root components
// modules are already in app module so dependencies are not a concern
// we've alrady eagerly loaded everything...
import {RxjsComponent} from 'src/app/rxjs/rxjs/rxjs.component';
import {AngularComponent} from 'src/app/angular/angular/angular.component';
import {NasaComponent} from 'src/app/nasa/nasa/nasa.component';
import {DashboardComponent} from 'src/app/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'rxjs', component: RxjsComponent},
  {path: 'angular', component: AngularComponent},
  {path: 'nasa', component: NasaComponent},
  // it seems the module must be lazy loaded for the sub router to behave as intended
  {path: 'root', loadChildren: () => import('./sub-router/sub-router.module').then((m) => m.SubRouterModule)},
  {path: '**', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// root components
// modules are already in app module so dependencies are not a concern
// we've alrady eagerly loaded everything...
import {RxjsComponent} from 'src/app/rxjs/rxjs/rxjs.component';
import {AngularComponent} from 'src/app/angular/angular/angular.component';
import {NasaComponent} from 'src/app/nasa/nasa/nasa.component';
import {DashboardComponent} from 'src/app/dashboard/dashboard/dashboard.component';
import {ResumeComponent} from 'src/app/resume/resume.component';
import {NonBlockingAsynchronousProgrammingComponent} from 'src/app/non-blocking-asynchronous-programming/non-blocking-asynchronous-programming.component';
import {UserManagementComponent} from 'src/app/user-management/user-management.component';
import {ThreeJsComponent} from 'src/app/three-js/three-js.component';
import {CrossOriginCommunicationComponent} from 'src/app/cross-origin-communication/cross-origin-communication.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'rxjs', component: RxjsComponent},
  {path: 'angular', component: AngularComponent},
  {path: 'nasa', component: NasaComponent},
  // it seems the module must be lazy loaded for the sub router to behave as intended
  {path: 'root', loadChildren: () => import('./sub-router/sub-router.module').then((m) => m.SubRouterModule)},
  {path: 'resume', component: ResumeComponent},
  {path: 'non-blocking-async', component: NonBlockingAsynchronousProgrammingComponent},
  {path: 'cross-origin-communication', component: CrossOriginCommunicationComponent},
  {path: 'user-management', component: UserManagementComponent},
  {path: 'three-js', component: ThreeJsComponent},
  {path: '**', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

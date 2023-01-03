import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubRouterComponent} from './sub-router/sub-router.component';
import {AngularComponent} from 'src/app/angular/angular/angular.component';

// the SubRouterComponent has a children and a router-outlet
const routes: Routes = [
  {path: 'root',
    component: SubRouterComponent,
    children: [
      {
        path: 'one',
        component: AngularComponent,
      },
      {
        path: 'lazy',
        loadChildren: () => import('./module-two/module-two.module').then((m) => m.ModuleTwoModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubRouterRoutingModule { }

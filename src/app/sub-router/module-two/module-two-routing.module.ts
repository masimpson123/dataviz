import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyComponentOneComponent } from './lazy-component-one/lazy-component-one.component';

const routes: Routes = [
  { path: 'lazy-one', component: LazyComponentOneComponent },
  { path: '', redirectTo: 'lazy-one', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleTwoRoutingModule { }

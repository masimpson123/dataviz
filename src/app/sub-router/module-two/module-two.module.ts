import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleTwoRoutingModule } from './module-two-routing.module';
import { LazyComponentOneComponent } from './lazy-component-one/lazy-component-one.component';


@NgModule({
  declarations: [
    LazyComponentOneComponent
  ],
  imports: [
    CommonModule,
    ModuleTwoRoutingModule
  ]
})
export class ModuleTwoModule { }

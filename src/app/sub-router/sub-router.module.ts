import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubRouterRoutingModule} from './sub-router-routing.module';
import {SubRouterComponent} from './sub-router/sub-router.component';


@NgModule({
  declarations: [
    SubRouterComponent,
  ],
  exports: [
    SubRouterComponent,
  ],
  imports: [
    CommonModule,
    SubRouterRoutingModule,
  ],
})
export class SubRouterModule { }

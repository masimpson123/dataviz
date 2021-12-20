import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularComponent } from './angular/angular.component';
import { NgContentTestComponent } from './angular/ng-content-test/ng-content-test.component';



@NgModule({
  declarations: [
    AngularComponent,
    NgContentTestComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AngularComponent
  ]
})
export class AngularModule { }

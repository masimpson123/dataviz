import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NasaComponent } from './nasa/nasa.component';

@NgModule({
  declarations: [
    NasaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NasaComponent
  ]
})
export class NasaModule { }

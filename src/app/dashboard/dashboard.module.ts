import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DataInputComponent} from './data-input/data-input.component';
import {DataVisualizerComponent} from './data-visualizer/data-visualizer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {DataVisualizerNetworkComponent} from './data-visualizer-network/data-visualizer-network.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    DataInputComponent,
    DataVisualizerComponent,
    DataVisualizerNetworkComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    DashboardComponent,
    DataInputComponent,
    DataVisualizerComponent,
  ],
})
export class DashboardModule { }

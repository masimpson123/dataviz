import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendInputComponent } from './friend-input/friend-input.component';
import { FriendVisualizerComponent } from './friend-visualizer/friend-visualizer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FriendVisualizerNetworkComponent } from './friend-visualizer-network/friend-visualizer-network.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FriendInputComponent,
    FriendVisualizerComponent,
    FriendVisualizerNetworkComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    DashboardComponent,
    FriendInputComponent,
    FriendVisualizerComponent
  ],
})
export class DashboardModule { }

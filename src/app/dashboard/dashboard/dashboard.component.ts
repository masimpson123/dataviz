import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Person } from '../../models/Person';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tabUpdate = 0;
  people: Map<string,Person> = new Map();

  constructor(public store: Store<{ people: Map<string,Person> }>) {
    this.store.select('people').subscribe((res)=>{
      this.people=res;
    });
  }

  change():void {
    this.tabUpdate += 1;
  }

}

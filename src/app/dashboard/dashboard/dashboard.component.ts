import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Person} from '../../models/Person';
import { MichaelIOState } from '../../store/michael-io-app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  tabUpdate = 0;
  people: Map<string, Person> = new Map();

  constructor(public store: Store<{state: MichaelIOState}>) {
    this.store.subscribe((res)=>{
      this.people=res.state.people;
    });
  }

  change():void {
    this.tabUpdate += 1;
  }
}

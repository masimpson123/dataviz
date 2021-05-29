import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tabUpdate = 0;

  constructor() { }

  ngOnInit(): void {
  }

  change():void {
    this.tabUpdate += 1;
  }

}

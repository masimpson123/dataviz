import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-component-one',
  templateUrl: './lazy-component-one.component.html',
  styleUrls: ['./lazy-component-one.component.css']
})
export class LazyComponentOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

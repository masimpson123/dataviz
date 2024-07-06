import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css'],
})
export class AngularComponent implements OnInit {
  constructor() { }

  @Input() templateTypeScriptAnalysisOne = 'one';

  ngOnInit(): void {
  }
}

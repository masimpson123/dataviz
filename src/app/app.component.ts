import {Component,OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // type any will trigger eslint error:
  bingo: any;
  title = 'Michael Simpson';
}

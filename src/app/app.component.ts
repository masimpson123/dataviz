import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Michael Simpson';
  urlParams = new URLSearchParams(window.location.search);
  nasa = this.urlParams.get('nasa');
  rxjs = this.urlParams.get('rxjs');
}

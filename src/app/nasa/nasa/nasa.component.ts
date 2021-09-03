import { Component } from '@angular/core';
import { NasaModel } from '../nasa.model';
import { NasaService } from '../nasa.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.css']
})
export class NasaComponent {

  content$: Observable<String[]> = this.nasa.fetchImages();

  constructor(public nasa: NasaService){}

}

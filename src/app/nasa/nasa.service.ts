import { Injectable } from '@angular/core';
import { NasaModel } from './nasa.model';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map, take } from 'rxjs/operators';

@Injectable({
 providedIn: 'root',
})
export class NasaService {

  date = '2021-08-01';

  constructor(private http: HttpClient) { }

  fetchImages(): Observable<String[]> {
    return this.http.get<NasaModel[]>(`https://api.nasa.gov/planetary/apod?start_date=` +
      this.date + `&api_key=`+API_KEY).pipe(
        map((res:NasaModel[]):String[] => {
          let urls: String[] = [];
          urls.push(
            res[0].url,
            res[2].url,
            res[3].url
          );
          return urls;
        })
      );
  }
}

const API_KEY = "3GHkYstXAVVX0LNoNMVibp2gh1guVXKduRxlDdtd";

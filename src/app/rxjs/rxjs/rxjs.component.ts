import { Component, OnInit } from '@angular/core';
import { fromEvent, of, from, Observable, interval, combineLatest } from 'rxjs';
import { throttleTime, map, scan, concatAll, exhaust, mergeAll, switchAll, take, mergeMap } from 'rxjs/operators';
import { NasaService, API_KEY } from '../../nasa/nasa.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  observableOne$: Observable<object>;

  constructor(public nasa: NasaService){

    // flattening joining study:
    let endpoints = [
      "https://api.nasa.gov/planetary/apod?start_date=2020-04-11&end_date=2020-04-12&api_key="+API_KEY,
      "https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-01-15&end_date=2016-01-19&api_key="+API_KEY,
      "https://api.nasa.gov/DONKI/CME?start_date=2021-08-01&end_date=2021-08-01&api_key="+API_KEY];
    // Observaber<Observable<string>>
    // mergeMap(), concatMap(), exhuastMap() and switchMap() do these two part
    // operations in one : )
    // combineLatest is another way to join values from numerous sources
    // let observableOne$ = from(endpoints).pipe(
    this.observableOne$ = of(endpoints).pipe(
      // map((x:string) => this.nasa.fetch(x)),
      // exhaust(), // second and third are ignored
      // mergeAll(), // all print in order last, first second
      // switchAll(), // first two requests are canceled. This operator switches to the newest emitted value
      // concatAll(), // all print in the expected order first second third

      // convert an array of endpoint strings to an array of observable requests
      // and rapidly initialize each request:
      map(endpoints => endpoints.map((x:string) => this.nasa.fetch(x))),

      // combineLatest causes the execution to asynchronously wait for each
      // input observable to emit
      // mergeMap causes observableOne$ to emit the values that are emitted by
      // the inner observables (ie the observables created by combineLatest()
      // and fetch())
      // requests is an array of observables
      mergeMap(requests => combineLatest(requests))
    );

    /*
    hostnameEffect = createEffect(
    () => this.actions$.pipe(
        ofType(actions.fetchSubBuildingFloorOverview),
        map(() => ['one', 'two', 'three']),
        map(hostnames => hostnames.map(hostname => this.fetchMock(hostname))),
        mergeMap(
            fetchedData => combineLatest(fetchedData).pipe(
                map((data) => actions.setFloorContent({content: null}))))));
    */

    // observableOne$.subscribe((x:Object|undefined) => console.log(x));
  }

  ngOnInit(): void {
    // The operators and simple syntax often make processing data
    // and reacting to events far simpler with RxJs

    // throttleTime create an excellent time based filter
    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        throttleTime(2000),
        map((event:MouseEvent) => event.clientX),
        scan((count, x) => count + x, 0))
      .subscribe(sum => console.log(`sum is ${sum}`));
  }

}

export const streamOne$ = interval(1).pipe(take(5));

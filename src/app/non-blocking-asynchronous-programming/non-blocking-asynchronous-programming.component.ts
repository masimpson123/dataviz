import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store, createAction, props } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, delay, tap, mergeMap } from 'rxjs/operators';

import { MichaelIOState } from '../store/michael-io-app.reducer';
import { fetchPeople } from '../store/michael-io-app.actions';

@Component({
  selector: 'app-non-blocking-asynchronous-programming',
  templateUrl: './non-blocking-asynchronous-programming.component.html',
  styleUrls: ['./non-blocking-asynchronous-programming.component.css']
})
export class NonBlockingAsynchronousProgrammingComponent implements OnInit {
  metrics$ = this.store.pipe(map(state => state.state.accumulatedMetrics));
  asyncPeople$ = this.store.pipe(map(state => state.state.asyncPeople));

  constructor(private store: Store<{state: MichaelIOState}>) {
  }

  ngOnInit(): void {
  }

  start() {
    end = false;
    this.store.dispatch(fetchPeople({ people: [] }));
  }

  stop() {
    end = true;
  }

}

@Injectable()
export class NonBlockingAsynchronousProgrammingEffect {
  constructor(
    private actions$: Actions,
    private httpService: HttpClient
  ) {}
  fetchRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[ASYNC] FETCH PEOPLE'),
      // delay(50),
      mergeMap(() => this.httpService.get(
        'https://endpoint-one-2-u7qjhl7iia-uc.a.run.app/people?crowd=1000')),
      map(people =>
        (end) ?
        ({ type: '[ASYNC] END' }) :
        ({ type: '[ASYNC] FETCH PEOPLE', people }))));
}

let end = false;

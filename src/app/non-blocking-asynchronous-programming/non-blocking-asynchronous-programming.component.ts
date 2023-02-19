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

  constructor(private store: Store<{state: MichaelIOState}>) {
    this.store.dispatch(fetchPeople({ metrics: { total: 0, senior: 0 }}));
  }

  ngOnInit(): void {
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
      delay(1000),
      mergeMap(() => this.httpService.get(
        'https://endpoint-one-2-u7qjhl7iia-uc.a.run.app/people?crowd=500')),
      map((people: any) => (people.reduce(
        (acc:any, cur:any) => ({
          total: acc.total + 1,
          senior: Number(cur.age) > 70 ? Number(cur.age) + 1 : Number(cur.age)
        }),
        { total: 0, senior: 0 }))),
      map(metrics => ({ type: '[ASYNC] FETCH PEOPLE', metrics }))));
}

import { TestScheduler } from 'rxjs/testing';
import { throttleTime } from 'rxjs/operators';
import { streamOne$ } from './rxjs.component';

fdescribe('',()=>{
  let testScheduler:any = null;
  beforeEach(()=>{
    testScheduler = new TestScheduler((actual, expected) => {
      // The 'true' expect statement:
      expect(actual).toEqual(expected);
    });
  });

  // This test runs synchronously.
  it('generates the stream correctly', () => {
    testScheduler.run((helpers:any) => {
      const { cold, flush, expectObservable, expectSubscriptions } = helpers;

      const t = 5; // t = 3

      const e1 = cold('      -a----b----c---|     ');
      const e1subs = '       ^--------------!     ';
      const expected = '     -a---------c---|     ';

      expectObservable(e1.pipe(throttleTime(t))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(e1subs);
    });
  });

  it('reliably tests an external observable',()=>{
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run((helpers:any) => {
      const { expectObservable } = helpers;
      const expected = '  -abcd(e|)  ';
      const values = {
        a:0,
        b:1,
        c:2,
        d:3,
        e:4,
      };
      expectObservable(streamOne$).toBe(expected,values);
    });
  });
});

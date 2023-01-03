import {Person} from './Person';

describe('Person', () => {
  it('should create an instance', () => {
    expect(new Person('Mathew', ['Michael'], 30, 170, (Math.random() * 100_000))).toBeTruthy();
  });
});

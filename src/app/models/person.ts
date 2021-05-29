export class Person {
  name:string;
  friends:string[];
  age:number;
  weight:number;
  constructor(name: string, friends: string[], age: number, weight: number) {
    this.name = name;
    this.friends = friends;
    this.age = age;
    this.weight = weight;
  }
}

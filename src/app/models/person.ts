export class Person {
  name:string;
  friends:string[];
  age:number;
  weight:number;
  id: number;
  constructor(name: string, friends: string[], age: number, weight: number, id: number) {
    this.name = name;
    this.friends = friends;
    this.age = age;
    this.weight = weight;
    this.id = id;
  }
}

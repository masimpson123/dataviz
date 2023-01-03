export class Person {
  readonly name:string;
  readonly friends:string[];
  readonly age:number;
  readonly weight:number;
  readonly id: number;
  constructor(name: string, friends: string[], age: number, weight: number, id: number) {
    this.name = name;
    this.friends = friends;
    this.age = age;
    this.weight = weight;
    this.id = id;
  }
  addFriend(friend:string) {
    this.friends.push(friend);
  }
}

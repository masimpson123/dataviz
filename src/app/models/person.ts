export class Person {
  readonly name:string;
  readonly friends:string[];
  readonly age:number;
  readonly security:string;
  readonly id: number;
  constructor(name: string, friends: string[], age: number, security: string, id: number) {
    this.name = name;
    this.friends = friends;
    this.age = age;
    this.security = security;
    this.id = id;
  }
  addFriend(friend:string) {
    this.friends.push(friend);
  }
}

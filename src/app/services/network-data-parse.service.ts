import { Injectable } from '@angular/core';
import { Node, LinkData, NetworkGraph } from '../models/models';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root'
})
export class NetworkDataParseService {

  constructor() { }

  parseData(peopleData:Map<string,Person>): NetworkGraph{
    const nodes: Node[] = [];
    const links: LinkData[] = [];
    peopleData.forEach((value:Person,key:string) => {
      const seed = Math.random();
      const node: Node = {
        "id": value.id,
        "name": value.name,
      };
      nodes.push(node);
      for(let friend of value.friends){
        let friendData = peopleData.get(friend);
        if(friendData) {
          const link: LinkData = {
          "source":value.id,
          "target":friendData.id,
          }
          links.push(link);
        }
      }
    });
    return {
      nodes:nodes,
      links:links
    };
  };
}

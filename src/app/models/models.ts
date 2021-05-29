export interface Node {
  id:number;
  name:string;
}

export interface LinkData {
  source:number;
  target:number;
}

export interface Link {
  source:Coordinates;
  target:Coordinates;
}

export interface Coordinates {
  x:number;
  y:number;
}

export interface NetworkGraph {
  nodes: Node[];
  links: LinkData[];
}

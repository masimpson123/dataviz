import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cross-origin-communication',
  templateUrl: './cross-origin-communication.component.html',
  styleUrls: ['./cross-origin-communication.component.css']
})
export class CrossOriginCommunicationComponent implements OnInit {

  theData: any = [];

  constructor() { }

  ngOnInit(): void {
    this.crossOriginRequest();
  }

  async crossOriginRequest() {
    while(!theData) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      (document.getElementById('crossOriginRequest') as any)?.contentWindow
        .postMessage("Fetch mars weather...", "http://michaelsimpson.io");
    }
    this.theData = theData;
  }

}

let theData: any = null;

window.addEventListener('message', (event) => {
  try {
    theData = JSON.parse(event.data);
  } catch {}
})

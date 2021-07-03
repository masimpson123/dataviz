import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FrameWorkMetrics } from '../../models/frame-work-metrics';
import { Node, LinkData, Link, Coordinates, NetworkGraph } from '../../models/models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Person } from '../../models/Person';
import { Store } from '@ngrx/store';
import { NetworkDataParseService } from '../../services/network-data-parse.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-friend-visualizer-network',
  templateUrl: './friend-visualizer-network.component.html',
  styleUrls: ['./friend-visualizer-network.component.css']
})
export class FriendVisualizerNetworkComponent {
  @Input() tabUpdate: number = 0;
  @Input() people: Map<string,Person> = new Map();

  @ViewChild('networkFigure') networkFigure?: ElementRef;

  constructor(private parser: NetworkDataParseService){}

  // TODO(michaelsimpson): find a better way to typecast this.svg
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private svg:any;
  private width = 100;
  private height = 100;

  ngOnChanges() {
    if(this.networkFigure){
      this.width = this.networkFigure.nativeElement.offsetWidth;
      this.height = this.networkFigure.nativeElement.offsetHeight;
      const data = this.parser.parseData(this.people);
      this.createSvg();
      this.drawNetwork(data);
    }
  }

  private createSvg(){
    d3.select("#my_dataviz svg").remove();
    // append the svg object to the body of the page
    this.svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .attr("style", "background-color:#5A6673; border-radius: 10px;")
    .append("g");
  }

  // TODO(michaelsimpson): find a better way to typecast data
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private drawNetwork(data:any){{
    var link = this.svg
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .style("stroke", "#aaa")

    var node = this.svg
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    .style("fill", "#69b3a2")

    // TODO(michaelsimpson): find a way to add lables...
    // var lables = node.append("text")
    // .text(function(d:Node) {
    //   return d.id;
    // })
    // .attr('x', 6)
    // .attr('y', 3);

    var simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink()
    // TODO(michaelsimpson): find a better way to typecast node datum
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    .id(function(d:any) { return d.id; })
    .links(data.links)
    )
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(this.width / 2 + 50, this.height / 2 + 100))
    .on("end", ticked);

    function ticked() {
    link
    .attr("x1", function(d:Link) { return d.source.x; })
    .attr("y1", function(d:Link) { return d.source.y; })
    .attr("x2", function(d:Link) { return d.target.x; })
    .attr("y2", function(d:Link) { return d.target.y; });

    node
    .attr("cx", function (d:Coordinates) { return d.x+6; })
    .attr("cy", function(d:Coordinates) { return d.y-6; });
    }
    };
  }
}

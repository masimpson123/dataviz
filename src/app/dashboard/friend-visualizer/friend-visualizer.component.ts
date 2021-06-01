import { Component, Input, OnChanges } from '@angular/core';
import { FrameWorkMetrics } from '../../models/frame-work-metrics';
import { Observable } from 'rxjs';
import { Person } from '../../models/Person';
import { Store } from '@ngrx/store';

import * as d3 from 'd3';

@Component({
  selector: 'app-friend-visualizer',
  templateUrl: './friend-visualizer.component.html',
  styleUrls: ['./friend-visualizer.component.css']
})
export class FriendVisualizerComponent {
  @Input() tabUpdate: number = 0;
  people$: Observable<Person[]>;
  private people: Person[] = [];
  // TODO(michaelsimpson): find a better way to typecast this.svg
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private svg:any;
  private margin = 50;
  private width = 500 - (this.margin * 2);
  private height = 300 - (this.margin * 2);

  // TODO(michaelsimpson): remove store from this component.
  // Data should be fetched in parent (ie dashboard)
  constructor(public store: Store<{ people: Person[] }>) {
    this.people$ = store.select('people');
    this.people$.subscribe((res)=>{
      this.people=res;
    });
  }

  ngOnChanges() {
    this.createSvg();
    this.drawBars(this.people);
  }

  private createSvg(): void {
    d3.select("#bar svg").remove();
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  // TODO(michaelsimpson): update this graph so that display name and UUID are decoupled
  // so that duplicate name entries can exist.
  private drawBars(data: any[]): void {
      // Create the X-axis band scale
      const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

      // Draw the X-axis on the DOM
      this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

      // Create the Y-axis band scale
      const y = d3.scaleLinear()
      .domain([0, 5])
      .range([this.height, 0]);

      // Draw the Y-axis on the DOM
      this.svg.append("g")
      .call(d3.axisLeft(y));

      // Create and fill the bars
      this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d:Person) => x(d.name))
      .attr("y", (d:Person) => y(d.friends.length))
      .attr("width", x.bandwidth())
      .attr("height", (d:Person) => this.height - y(d.friends.length))
      .attr("fill", "#d04a35");
  }

}

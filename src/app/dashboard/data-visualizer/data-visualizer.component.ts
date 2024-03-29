import {Component, Input, OnChanges, ViewChild, ElementRef} from '@angular/core';
import {FrameWorkMetrics} from '../../models/frame-work-metrics';
import {Observable} from 'rxjs';
import {Person} from '../../models/Person';

import * as d3 from 'd3';

@Component({
  selector: 'app-data-visualizer',
  templateUrl: './data-visualizer.component.html',
  styleUrls: ['./data-visualizer.component.css'],
})
export class DataVisualizerComponent {
  @Input() tabUpdate: number = 0;
  @Input() people: Map<string, Person> = new Map();

  @ViewChild('barFigure') barFigure?: ElementRef;

  // TODO(michaelsimpson): find a better way to typecast this.svg
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private svg:any;
  private margin = 50;
  private width = 100;
  private height = 100;

  ngOnChanges() {
    if (this.barFigure) {
      this.width = this.barFigure.nativeElement.offsetWidth - (this.margin * 2);
      this.height = this.barFigure.nativeElement.offsetHeight - (this.margin * 2);
      this.createSvg();
      this.drawBars(this.people);
    }
  }

  private createSvg(): void {
    d3.select('#bar svg').remove();
    this.svg = d3.select('figure#bar')
        .append('svg')
        .attr('width', this.width + (this.margin * 2))
        .attr('height', this.height + (this.margin * 2))
        .attr('style', 'background-color:#5A6673; border-radius: 10px;')
        .append('g')
        .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  // TODO(michaelsimpson): update this graph so that display name and UUID are decoupled
  // so that duplicate name entries can exist.
  private drawBars(dataInput: Map<string, Person>): void {
    const data:Person[] = [];
    // TODO(michaelsimpson): update this graph so that the people data does
    // not have to be converted into an array
    this.people.forEach((value: Person, key:string) => {
      data.push(value);
    });
    Array.from(dataInput);
    // Create the X-axis band scale
    const x = d3.scaleBand()
        .range([0, this.width])
        .domain(data.map((d) => d.name))
        .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
        .domain([0, 10])
        .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g')
        .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll('bars')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d:Person) => x(d.name))
        .attr('y', (d:Person) => y(d.friends.length))
        .attr('width', x.bandwidth())
        .attr('height', (d:Person) => this.height - y(d.friends.length))
        .attr('fill', '#d04a35');
  }
}

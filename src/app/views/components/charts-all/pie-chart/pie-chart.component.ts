import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { WordCount } from 'src/app/interfaces/word-count';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  @Input() wordCountList!: WordCount | undefined;
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: string[] = [];
  public pieChartData: ChartData[] = [];
  public chartData: number[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(){
  }

  ngOnChanges(): void {
    console.log(this.wordCountList);
    if (this.wordCountList) {
      this.pieChartLabels = Object.keys(this.wordCountList);
      this.chartData = Object.values(this.wordCountList);
      this.pieChartData = [{data: this.chartData}];
    }
  }
}

interface ChartData {
  data: number[];
}

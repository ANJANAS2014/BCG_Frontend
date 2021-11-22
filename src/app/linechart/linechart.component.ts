import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];

  out:any = [];

  colors = [
    {
      backgroundColor: '#B983FF'
    },
    {
      backgroundColor: 'skyblue'
    },
    {
      backgroundColor:'pink'
    },
    {
      backgroundColor:'lightgreen'
    }
  ]

  
  constructor(private ds:DataService) { }

  ngOnInit(): void {    
    this.getalldata();    
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

getdata(){
  
  this.barChartData = []
  console.log("befor push",this.barChartData)



    let No:any={
      label:"North",
      data:[]
    }
    let So:any={
      label:"South",
      data:[]
    }
    let Ea:any={
      label:"East",
      data:[]
    }
    let We:any={
      label:"West",
      data:[]
    }
    for(let d of this.out){
      this.barChartLabels.push(d['month'])
      if('North' in d){
        No['data'].push(d['North'])
      }
      else{
        No['data'].push(0)
      }
      if('South' in d){
        So['data'].push(d['South'])
      }
      else{
        So['data'].push(0)
      }
      if('East' in d){
        Ea['data'].push(d['East'])
      }
      else{
        Ea['data'].push(0)
      }
      if('West' in d){
        We['data'].push(d['West'])
      }
      else{
        We['data'].push(0)
      }
    }
    this.barChartData.push(No,So,Ea,We)
    console.log(this.barChartData)
  }

  getalldata(){

    this.ds.chartData().subscribe(

      (result: any) => {
        if (result) {
          console.log("result",result['values_customer']);          
          this.out = this.out.concat(result["values_customer"]);
          this.getdata();
        }
      }, 
      (err :any) => {
        alert(err.message)
      }

      )

  }





}

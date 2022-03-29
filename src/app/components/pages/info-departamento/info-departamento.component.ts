import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexPlotOptions,
  ApexGrid,
  ApexStroke,
  ApexAnnotations,
  ApexResponsive
} from "ng-apexcharts";
import { InfoDepartamentoService } from 'src/app/services/pages/info-departamento.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
  markers: any; //ApexMarkers;
  stroke: ApexStroke; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  annotations: ApexAnnotations;
  grid: ApexGrid;
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  colors: string[];
};

export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-info-departamento',
  templateUrl: './info-departamento.component.html',
  styleUrls: ['./info-departamento.component.css']
})

export class InfoDepartamentoComponent implements OnInit {

  public chartOptions!: Partial<ChartOptions>| any;
  public chartOptions2!: Partial<ChartOptions2>| any;
  public chartOptions3!: Partial<ChartOptions3>| any;
  filterFormodel: { periodoID: number | string, departamentoID: number };
  periodos: any;
  departamentos: any;
  loading: boolean;
  balanceDto: any;
  resultadosGeneralesDto: any;
  departamento: any;
  periodo: any;
  rankings: any;
  count_ranking: any;
  rank_dep: any;
  rank_one: any;

  constructor(private infoDepartamentoService: InfoDepartamentoService) {
    this.filterFormodel= {
      periodoID:6,
      departamentoID:5                     
    };

    

    this.loading= false;

    this.chartOptions = {
      series: [
        {
          name: "Income",
          type: "column",
          data: []
        },
      
      ],
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8",
        "#775DD0"
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [2]
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          endingShape: "rounded"
        }
      },
      title: {
        text: undefined,
        align: "left",
        offsetX: 110
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: []
      },
      yaxis: [
        {
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false,
            color: "#008FFB"
          },
          labels: {
            show: false,
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: undefined,
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
    };

    this.chartOptions2 = {
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28, 16, 21, 13, 30, 12]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
         
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8",
        "#775DD0"
      ],
      plotOptions: {
        bar: {
          columnWidth: "15%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: "bottom",
        offsetY: 10
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };

    this.chartOptions3 = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "01/2011",
          "02/2011",
          "03/2011",
          "04/2011",
          "05/2011",
          "06/2011"
        ]
      },
      legend: {
        position: "bottom",
        offsetY: 10
      },
      fill: {
        opacity: 1
      }
    };

    this.getLists();
    this.sendFilter();
    
   }

  ngOnInit(): void {
    
  }
  rankexpnac (){
    let data_series: any[]= [];
    let data_categories: any[]= [];
    this.rankings.forEach((element:any) => {
      data_series.push(element.fobdolares);
      data_categories.push(element.departament);
    });

    this.count_ranking = this.rankings.length;

    console.log('this.departamento', this.departamento);
    

    this.rank_dep=  this.rankings.find((rank: any) => {
      return rank.id === this.departamento.id;
    });

    this.rank_one=  this.rankings.find((rank: any) => {
      return rank.rank === 1;
    });


    this.chartOptions = {
      series: [
        {
          name: "Fobdolares",
          type: "column",
          data: data_series
        },
      
      ],
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8",
        "#775DD0"
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [2]
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          endingShape: "rounded"
        }
      },
      title: {
        text: undefined,
        align: "left",
        offsetX: 110
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: data_categories
      },
      yaxis: [
        {
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false,
            color: "#008FFB"
          },
          labels: {
            show: false,
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: undefined,
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }

  getLists(){
    this.infoDepartamentoService.getAllFilter().subscribe((response) => {   
      console.log('response', response);
      this.departamentos= response.departamentos;
      this.periodos= response.periodos;
      
    },
    (error) => {
      console.log('error', error);
    }
    );
  }

  edit(){
    console.log('Editando');
    
  }

  stringFormat(string: any){
    if (string!=null && string!='') {
      var mayus = string.substring(0, 1).toUpperCase();
      var resto = string.substring(1, string.lenght).toLowerCase();
      return mayus.concat(resto.toString());
    }
    return null;
  }

 

  

  sendFilter(){

    this.loading= true;

    this.infoDepartamentoService.postFilter(this.filterFormodel).subscribe((response) => {  
      
      this.loading= false;
      this.balanceDto = response.balanceDto;
      this.resultadosGeneralesDto = response.resultadosGeneralesDto;
      this.rankings = response.rankings.sort((a:any, b:any) => (a.rank < b.rank ? -1 : 1));

   
       
      this.departamento=  this.departamentos.find((depa: any) => {
        return depa.id === this.filterFormodel.departamentoID;
      });

     
      this.rankexpnac();

      this.periodo=  this.periodos.find((pera: any) => {
        return pera.id === this.filterFormodel.periodoID;
      });
      
    },
    (error) => {
      this.loading= false;
      console.log('error', error);
    }
    );
    
  }
}

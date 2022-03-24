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
  ApexResponsive
} from "ng-apexcharts";
import { InfoDepartamentoService } from 'src/app/services/pages/info-departamento.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
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
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
        },
        {
          name: "Cashflow",
          type: "column",
          data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
        },
        {
          name: "Revenue",
          type: "line",
          data: [20, 29, 37, 36, 44, 45, 50, 58]
        }
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
        width: [1, 1, 4]
      },
      title: {
        text: "XYZ - Stock Analysis (2009 - 2016)",
        align: "left",
        offsetX: 110
      },
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: "Income (thousand crores)",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              color: "#00E396"
            }
          },
          title: {
            text: "Operating Cashflow (thousand crores)",
            style: {
              color: "#00E396"
            }
          }
        },
        {
          seriesName: "Revenue",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FEB019"
          },
          labels: {
            style: {
              color: "#FEB019"
            }
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: "#FEB019"
            }
          }
        }
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
      console.log(response);
      this.loading= false;
      this.balanceDto = response.balanceDto;
      this.resultadosGeneralesDto = response.resultadosGeneralesDto;
       
      this.departamento=  this.departamentos.find((depa: any) => {
        return depa.id === this.filterFormodel.departamentoID;
      });

      console.log('this.departamento',this.departamento);
      

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

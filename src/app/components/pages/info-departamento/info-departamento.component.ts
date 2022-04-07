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
  ApexResponsive,
  ApexNonAxisChartSeries
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

export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type ChartOptions5 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
};

export type ChartOptions6 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};



export type ChartOptions7 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
};

export type ChartOptions8 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

export type ChartOptions9 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
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
  public chartOptions4!: Partial<ChartOptions4>| any;
  public chartOptions5!: Partial<ChartOptions5>| any;
  public chartOptions6!: Partial<ChartOptions6>| any;
  public chartOptions7!: Partial<ChartOptions7>| any;
  public chartOptions8!: Partial<ChartOptions8>| any;
  public chartOptions9!: Partial<ChartOptions9>| any;
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
  capitulosArancelariosDept:any;
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
          rotate: -90,
          rotateAlways: true,
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

    this.chartOptions4 = {
      series: [
        {
          name: "Valor",
          data: []
        },
        {
          name: "Variación",
          data: []
        },
        {
          name: "Participacion",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        curve: "smooth",
        dashArray: [0, 0, 0]
      },
      title: {
        text: "Capitulos Arancelarios",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val:any, opts:any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: []
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val:any) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val:any) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val:any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };

    this.chartOptions5 = {
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      chart: {
        type: "polarArea",
        height: 350,
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptions6 = {
      series: [
        {
          name: "STOCK ABC",
          data: [
            8107.85,
            8128.0,
            8122.9,
            8165.5,
            8340.7,
            8423.7,
            8423.5,
            8514.3,
            8481.85,
            8487.7,
            8506.9,
            8626.2,
            8668.95,
            8602.3,
            8607.55,
            8512.9,
            8496.25,
            8600.65,
            8881.1,
            9340.85
          ]
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Intensidad tecnológica CICI Rev.2",
        align: "left"
      },
      subtitle: {
        text: "178,080",
        align: "left"
      },
      labels: [
        "13 Nov 2017",
        "14 Nov 2017",
        "15 Nov 2017",
        "16 Nov 2017",
        "17 Nov 2017",
        "20 Nov 2017",
        "21 Nov 2017",
        "22 Nov 2017",
        "23 Nov 2017",
        "24 Nov 2017",
        "27 Nov 2017",
        "28 Nov 2017",
        "29 Nov 2017",
        "30 Nov 2017",
        "01 Dec 2017",
        "04 Dec 2017",
        "05 Dec 2017",
        "06 Dec 2017",
        "07 Dec 2017",
        "08 Dec 2017"
      ],
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        show: false,
        opposite: false
      },
      legend: {
        horizontalAlign: "left"
      }
    };

    this.chartOptions7 = {
      series: [44, 55, 67],
      chart: {
        height: 350,
        type: "radialBar"
      },
      title: {
        text: "Paises",
        align: "left"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total",
              formatter: function(w:any) {
                return "249";
              }
            }
          }
        }
      },
      labels: ["Visits", "Sales", "Earnings",]
    };

    this.chartOptions8 = {
      series: [44, 55, 13, 43, 22],
      title: {
        text: "Bloques Geográficos",
        align: "left"
      },
      chart: {
        height: 350,
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptions9 = {
      series: [
        {
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val:any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
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
          "Nov",
          "Dec"
        ],
        position: "bottom",
        labels: {
          
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val:any) {
            return val + "%";
          }
        }
      },
      title: {
        text: "Agrupación de paises por acuerdos comerciales",
        align: "left"
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

  

    let valor: any[]= [];
    let variacion: any[]= [];
    let participacion: any[]= [];
    let categoria: any[]= [];
    this.capitulosArancelariosDept.forEach((element:any) => {
      valor.push(element.valor);
      variacion.push(element.variacion);
      participacion.push(element.participacion);
      categoria.push(element.capitulo);
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
          rotate: -90,
          rotateAlways: true,
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

    this.chartOptions4 = {
      series: [
        {
          name: "Valor",
          data: valor
        },
        {
          name: "Variación",
          data: variacion
        },
        {
          name: "Participacion",
          data: participacion
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        curve: "smooth",
        dashArray: [0, 0, 0]
      },
      title: {
        text: "Capitulos Arancelarios",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val:any, opts:any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: categoria
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val:any) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function(val:any) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function(val:any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
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
      this.capitulosArancelariosDept= response.capitulosArancelariosDept;
   
       
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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
//import * as htmlToPdfmake from 'html-to-pdfmake';

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
  labels: string[];
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

  title = 'htmltopdf';
  
  @ViewChild('pdfTable') pdfTable: ElementRef | undefined;

  public chartOptions!: Partial<ChartOptions>| any;
  public chartOptions2!: Partial<ChartOptions2>| any;
  public chartOptions3!: Partial<ChartOptions3>| any;
  public chartOptions4!: Partial<ChartOptions4>| any;
  public chartOptions5!: Partial<ChartOptions5>| any;
  public chartOptions6!: Partial<ChartOptions6>| any;
  public chartOptions7!: Partial<ChartOptions7>| any;
  public chartOptions8!: Partial<ChartOptions8>| any;
  public chartOptions9!: Partial<ChartOptions9>| any;
  filterFormodel: { periodoID: number | string, departamentoID: number, extraPeriodo:number, graficaConsulta:number, anioConsulta:number };
  filterFormodelGraph: { categoriaID: number | string; };
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
  periodosExtra: { id: number; numero: number; periodo_id: number; nombrePeriodoExtra: string; mescortemin: number; mescortemax: number; }[];
  _periodosExtra: { id: number; numero: number; periodo_id: number; nombrePeriodoExtra: string; mescortemin: number; mescortemax: number; }[] | undefined;
  fobDepartamentos: any;
  kilosNetos: any;
  intensidadTecno: any;
  paises: any;
  bloquesGeoDept: any;
  closeResult: string | undefined;
  categorias: any;
  modalHeader: string = '';
  years: any[]= [];
  mesCorte: number;
  yearmax: any;
  meses: string[];

  constructor(private infoDepartamentoService: InfoDepartamentoService, private modalService: NgbModal,) {
    this.filterFormodel= {
      periodoID:6,
      departamentoID:68,
      extraPeriodo:0,
      graficaConsulta:1,
      anioConsulta:2021                 
    };

    this.filterFormodelGraph= {
      categoriaID:0                 
    };

    this.periodosExtra=[
      {id:0, numero: 1, periodo_id:3, nombrePeriodoExtra:'Primer Semestre', mescortemin: 1 , mescortemax: 6},
      {id:1, numero: 2, periodo_id:3, nombrePeriodoExtra:'Segundo Semestre', mescortemin: 7, mescortemax: 12},
      {id:2, numero: 1, periodo_id:4, nombrePeriodoExtra:'Primer Trimestre', mescortemin: 1, mescortemax: 3},
      {id:3, numero: 2, periodo_id:4, nombrePeriodoExtra:'Segundo Trimestre', mescortemin: 4, mescortemax: 6},
      {id:4, numero: 3, periodo_id:4, nombrePeriodoExtra:'Tercer Trimestre', mescortemin: 7, mescortemax: 9},
      {id:5, numero: 4, periodo_id:4, nombrePeriodoExtra:'Cuarto Trimestre', mescortemin: 10, mescortemax: 12},
      {id:6, numero: 1, periodo_id:2, nombrePeriodoExtra:'Enero', mescortemin: 1, mescortemax: 1},
      {id:7, numero: 2, periodo_id:2, nombrePeriodoExtra:'Febrero', mescortemin: 2, mescortemax: 2},
      {id:8, numero: 3, periodo_id:2, nombrePeriodoExtra:'Marzo', mescortemin: 3, mescortemax: 3},
      {id:9, numero: 4, periodo_id:2, nombrePeriodoExtra:'Abril', mescortemin: 4, mescortemax: 4},
      {id:10, numero: 5, periodo_id:2, nombrePeriodoExtra:'Mayo', mescortemin: 5, mescortemax: 5},
      {id:11, numero: 6, periodo_id:2, nombrePeriodoExtra:'Junio', mescortemin: 6, mescortemax: 6},
      {id:12, numero: 7, periodo_id:2, nombrePeriodoExtra:'Julio', mescortemin: 7, mescortemax: 7},
      {id:13, numero: 8, periodo_id:2, nombrePeriodoExtra:'Agosto', mescortemin: 8, mescortemax: 8},
      {id:14, numero: 9, periodo_id:2, nombrePeriodoExtra:'Septiembre', mescortemin: 9, mescortemax: 9},
      {id:15, numero: 10, periodo_id:2, nombrePeriodoExtra:'Octubre', mescortemin: 10, mescortemax: 10},
      {id:16, numero: 11, periodo_id:2, nombrePeriodoExtra:'Noviembre', mescortemin: 11, mescortemax: 11},
      {id:17, numero: 12, periodo_id:2, nombrePeriodoExtra:'Diciembre', mescortemin: 12, mescortemax: 12},
      
    ];

    this.meses= ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

    this.mesCorte= 12;
 
    this.periodosExtra=this.periodosExtra;
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
      series: [],
      chart: {
        height: 350,
        type: "donut"
      },
      labels: [],
      // stroke: {
      //   width: 1,
      //   curve: "smooth",
      //   dashArray: [0, 0, 0]
      // },
      title: {
        text: "Capitulos Arancelarios",
        align: "left"
      },
      // legend: {
      //   tooltipHoverFormatter: function(val:any, opts:any) {
      //     return (
      //       val +
      //       " - <strong>" +
      //       opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
      //       "</strong>"
      //     );
      //   }
      // },
      // markers: {
      //   size: 0,
      //   hover: {
      //     sizeOffset: 6
      //   }
      // },
      // xaxis: {
      //   labels: {
      //     trim: false
      //   },
      //   categories: []
      // },
      // tooltip: {
      //   y: [
      //     {
      //       title: {
      //         formatter: function(val:any) {
      //           return val + " (mins)";
      //         }
      //       }
      //     },
      //     {
      //       title: {
      //         formatter: function(val:any) {
      //           return val + " per session";
      //         }
      //       }
      //     },
      //     {
      //       title: {
      //         formatter: function(val:any) {
      //           return val;
      //         }
      //       }
      //     }
      //   ]
      // },
      // grid: {
      //   borderColor: "#f1f1f1"
      // }
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
      series: [],
      chart: {
        type: "donut",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      // dataLabels: {
      //   enabled: false
      // },
      // stroke: {
      //   curve: "straight"
      // },

      title: {
        text: "Intensidad tecnológica",
        align: "left"
      },
      subtitle: {
        text: "178,080",
        align: "left"
      },
      labels: [],
      // xaxis: {
      //   type: "datetime"
      // },
      // yaxis: {
      //   show: false,
      //   opposite: false
      // },
      // legend: {
      //   horizontalAlign: "left"
      // }
    };

    this.chartOptions7 = {
      series: [],
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
      labels: []
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
    this.getGraph();
    
   }

  ngOnInit(): void {
    
  }


  downloadAsPDF() {
    const doc = new jsPDF();
    var htmlToPdfmake = require("html-to-pdfmake");
    const pdfTable = this.pdfTable?.nativeElement;

    console.log('pdfTable',pdfTable.innerHTML);
    
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }


  printPage() {
    window.print();
  }

  onChangePeriodo(event:any){
    this.filterFormodel.extraPeriodo=0;
    this._periodosExtra= this.periodosExtra.filter((pe: any) => {

      if (pe.periodo_id === this.filterFormodel.periodoID) {
        if (this.mesCorte>=pe.mescortemin && (this.mesCorte<=pe.mescortemax || this.mesCorte>=pe.mescortemax)) {
          return true;
        }
      }
      return  false;
    });
    console.log('this.mesCorte', this.mesCorte);
    
    console.log('this._periodosExtra', this._periodosExtra);
    console.log('this.periodosExtra', this.periodosExtra);
    
  }
  rankexpnac (graficaConsulta:number){


    switch (graficaConsulta) {
      case 1:
        let data_series: any[]= [];
        let data_categories: any[]= [];
        
        if (this.rankings!=null) {
          this.rankings.forEach((element:any) => {
            data_series.push(element.fobdolares);
            data_categories.push(element.departament);
          });
        }
        

        this.count_ranking = (this.rankings!=null) ?this.rankings.length:null;

       

        this.rank_dep=  ( this.rankings!=null && this.departamento!=null)? this.rankings.find((rank: any) => {
          return rank.id === this.departamento.id;
        }): null;

        this.rank_one=  ( this.rankings!=null)? this.rankings.find((rank: any) => {
          return rank.rank === 1;
        }):null;

      

        let valor: any[]= [];
        let variacion: any[]= [];
        let participacion: any[]= [];
        let categoria: any[]= [];

        if (this.capitulosArancelariosDept!=null) {
          this.capitulosArancelariosDept.forEach((element:any) => {
            valor.push(element.valor);
            variacion.push(element.variacion);
            participacion.push(element.participacion);
            categoria.push(element.capitulo);
          });
        }

        
        console.log('this.departamento', this.departamento);
        

        this.rank_dep=  ( this.rankings!=null && this.departamento!=null)? this.rankings.find((rank: any) => {
          return rank.id === this.departamento.id;
        }): null;

        this.rank_one=  ( this.rankings!=null)? this.rankings.find((rank: any) => {
          return rank.rank === 1;
        }):null;

  
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
    
        
        
    
        break;

      case 2:
        let fob_categoria: any[]= [];
        let data_categories_fob: any[]= [];
        let data_categories_epd: any[]= [];
        let data_categories_eme: any[]= [];
        let data_categories_epa: any[]= [];
        let data_categories_ec: any[]= [];


        if (this.fobDepartamentos!=null) {
          this.fobDepartamentos.forEach((element:any) => {
            fob_categoria.push(element.fecha);
            switch (element.categoria) {
              case 'Exportaciones totales':
                data_categories_fob.push(element.fobdolares);
                break;
              case 'Excluyendo petróleo y derivados':
                data_categories_epd.push(element.fobdolares);
                break;

              case 'Excluyendo minero enérgeticos':
                data_categories_eme.push(element.fobdolares);
                break;

              case 'Excluyendo productos agrícolas':
                data_categories_epa.push(element.fobdolares);
                break;
              case 'Excluyendo café':
                data_categories_ec.push(element.fobdolares);
                 break;
              default:
                break;
            }
          });
        }

        let result_cat = fob_categoria.sort().filter((item,index)=>{
          return fob_categoria.indexOf(item) === index;
        })
        


        this.chartOptions3 = {
          series: [
            {
              name: "Exportaciones totales",
              data: data_categories_fob
            },
            {
              name: "Excluyendo petróleo y derivados",
              data: data_categories_epd
            },
            {
              name: "Excluyendo minero enérgeticos",
              data: data_categories_eme
            },
            {
              name: "Excluyendo productos agrícolas",
              data: data_categories_epa
            },
            {
              name: "Excluyendo café",
              data: data_categories_ec
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
            categories: result_cat
          },
          legend: {
            position: "bottom",
            offsetY: 10
          },
          fill: {
            opacity: 1
          }
        };
        break;
      
      case 3:

        
        let valor3: any[]= [];
        let variacion3: any[]= [];
        let participacion3: any[]= [];
        let categoria3: any[]= [];

        if (this.capitulosArancelariosDept!=null) {
          this.capitulosArancelariosDept.forEach((element:any) => {
            valor3.push(element.valor);
            variacion3.push(element.variacion);
            participacion3.push(element.participacion);
            categoria3.push(element.capitulo);
          });
        }

        this.chartOptions4 = {
          series: valor3,
          chart: {
            height: 350,
            type: "donut"
          },
          labels: categoria3,
          // stroke: {
          //   width: 1,
          //   curve: "smooth",
          //   dashArray: [0, 0, 0]
          // },
          title: {
            text: "Capitulos Arancelarios",
            align: "left"
          },
          
        };

    
        
        break;  
      
      case 4:
        

        let valor4: any[]= [];
        let variacion4: any[]= [];
        let participacion4: any[]= [];
        let categoria4: any[]= [];

        if (this.intensidadTecno!=null) {
          this.intensidadTecno.forEach((element:any) => {
            valor4.push(element.valor);
            categoria4.push(element.nivel);
          });
        }

        this.chartOptions6 = {
          series: valor4,
          chart: {
            type: "donut",
            height: 350,
            zoom: {
              enabled: false
            }
          },
          // dataLabels: {
          //   enabled: false
          // },
          // stroke: {
          //   curve: "straight"
          // },
    
          title: {
            text: "Intensidad tecnológica",
            align: "left"
          },
          subtitle: {
            text: "178,080",
            align: "left"
          },
          labels: categoria4,
          // xaxis: {
          //   type: "datetime"
          // },
          // yaxis: {
          //   show: false,
          //   opposite: false
          // },
          // legend: {
          //   horizontalAlign: "left"
          // }
        };


        break; 
        
      case 5:

        let valor5: any[]= [];       
        let categoria5: any[]= [];

        if (this.paises!=null) {
          this.paises.forEach((element:any) => {
            valor5.push(element.numExportadoras);
            categoria5.push(element.pais);
          });
        }

        this.chartOptions7 = {
          series: valor5,
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
          labels: categoria5
        };
        break;   
        
        case 6:
          let valor6: any[]= [];       
          let categoria6: any[]= [];

        if (this.bloquesGeoDept!=null) {
          this.bloquesGeoDept.forEach((element:any) => {
            valor6.push(element.numExportadoras);
            categoria6.push(element.pais);
          });
        }
          
        break;
      default:
        break;
    }
    
    

  }

  getLists(){
    this.infoDepartamentoService.getAllFilter().subscribe((response) => {   
      console.log('response', response);
      this.departamentos= response.departamentos;
      this.periodos= response.periodos;
      this.categorias = response.categorias;
      this.mesCorte= response.mescorte;
      this.yearmax= response.añomax;

      for (let index = response.añomin; index < response.añomax; index++) {        
        this.years.push(index);        
      }

     
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

 getGraph(){
    this.sendFilter(1);
    this.sendFilter(2);
    this.sendFilter(3);
    this.sendFilter(4);
    this.sendFilter(5);
 }

  

  sendFilter(graficaConsulta:number){

    this.loading= true;
    this.filterFormodel.graficaConsulta= graficaConsulta;

    this.infoDepartamentoService.postFilter(this.filterFormodel).subscribe((response) => {  

      console.log('response'+graficaConsulta, response);
      
      
      switch (graficaConsulta) {
        case 1:
          this.balanceDto = response.balanceDto;
          this.resultadosGeneralesDto = response.resultadosGeneralesDto;
          this.rankings = (response.rankings!=null) ? response.rankings.sort((a:any, b:any) => (a.rank < b.rank ? -1 : 1)): null;
          break;
        
        case 2:
          this.fobDepartamentos= response.fobDepartamentos;
          this.kilosNetos= response.kilosNetos;
          break;        

        case 3:
          this.capitulosArancelariosDept= response.capitulosArancelariosDept;
          
          break;  
        
        case 4:
            this.intensidadTecno= response.intensidadTecno;
          
          break; 
        
        case 5:
           
            this.paises= response.paises;
          break; 

        case 6:
            this.bloquesGeoDept= response.bloquesGeoDept;
          break;

        default:
          break;
      }
      this.loading= false;
      
      this.rankexpnac(graficaConsulta);


      if (this.departamentos !=undefined ) {
        this.departamento=  this.departamentos.find((depa: any) => {
          return depa.id === this.filterFormodel.departamentoID;
        });
  
      }else{
        this.departamento= null;
      }

      this.periodo=  (this.periodos!=undefined)? this.periodos.find((pera: any) => {
        return pera.id === this.filterFormodel.periodoID;
      }): null;
      
    },
    (error) => {
      this.loading= false;
      console.log('error', error);
    }
    );
    
  }

  open(content:any, modalHeader:string) {
    this.modalHeader= modalHeader;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}



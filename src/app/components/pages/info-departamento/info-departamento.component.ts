import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatoNumeroPipe } from 'src/app/pipes/formato.numero.pipe';


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
  yaxis: ApexYAxis | ApexYAxis[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
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
  plotOptions: ApexPlotOptions;
};

export type ChartOptions5 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
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
  tooltip: any; 
  plotOptions: ApexPlotOptions;
};



export type ChartOptions7 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive;
  title: ApexTitleSubtitle;
  tooltip: any; 
  plotOptions: ApexPlotOptions;
};

export type ChartOptions8 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  tooltip: any; 
  plotOptions: ApexPlotOptions;
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
  tooltip: any; 
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
  filterFormodel: { periodoID: number | string, departamentoID: number, extraPeriodo:number, graficaConsulta:number, anioConsulta:number, categoriaFiltro:number | string };
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
  acuerdosComerciales: any;
  print: boolean = false;
  _graficaConsulta: number = 1;

  constructor(private infoDepartamentoService: InfoDepartamentoService, private modalService: NgbModal,) {
    this.filterFormodel= {
      periodoID:6,
      departamentoID:68,
      extraPeriodo:0,
      graficaConsulta:1,
      anioConsulta:(new Date()).getFullYear(),
      categoriaFiltro:0
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
 
    this._periodosExtra=this.periodosExtra;
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
        height: 500,
        width: '80%',
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false,
        formatter: function (val:any, opt:any) {
          return formatoNumeroPipe.localeStringStaticCutDecimal(val, 2);    
        },
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
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 300,
          style: {
              colors: [],
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
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
        },
        y: {
          formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
            return '$ '+formatoNumeroPipe.localeStringStaticCutDecimal(value, 2)+' Millones';  
          }
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
      tooltip: {
        y: {
          formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
            return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
          }
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val:any, opt:any) {
          return formatoNumeroPipe.localeStringStaticCutDecimal(val, 2);    
        },
      },
      legend: {
        position: "bottom",
      },
      grid: {
        show: false
      },
      yaxis: {
        show: false,
        labels: {
             formatter: function(val:any, index:any) {
            return formatoNumeroPipe.localeStringStaticCutDecimal(val, 2);    
          }
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
            fontSize: "16px"
          }
        }
      }
    };

    this.chartOptions3 = {
      series: [],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },     
          autoSelected: 'zoom' 
        },
       
      },
      dataLabels: {
        enabled: true,
        formatter: function(value:any, { seriesIndex, dataPointIndex, w }: { seriesIndex: any; dataPointIndex:any; w:any }) {
          var prueba: any = null;
          w.config.series.forEach((element:any) => {
            prueba= prueba+ ' ' + element.name;
          });
          return prueba
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
      tooltip: {
        y: {
          formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
            return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
          }
        }
      },
      xaxis: {
        type: "category",
        categories: [ 
        ]
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
      legend: {
        position: "bottom",
        // offsetY: 10
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
      plotOptions: {
        pie: {
          customScale: 0.8
        }
      },
      title: {
        text: "Capítulos Arancelarios",
        align: "left"
      },
      tooltip: {
        y: {
          formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
            return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
          }
        }
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
      series: [],
      chart: {
        type: "donut",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        pie: {
          customScale: 0.8
        }
      },
 
      title: {
        text: "Intensidad tecnológica",
        align: "left"
      },
      subtitle: {
        text: "178,080",
        align: "left"
      },
      labels: [],
      tooltip: {
        y: {
          formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
            return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
          }
        }
      }
    };

    this.chartOptions7 = {
      series: [],
      chart: {
        height: 350,
        type: "donut"
      },
      title: {
        text: "Países",
        align: "left"
      },
      plotOptions: {
        pie: {
          customScale: 0.8
        }
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
      ],
      labels: [],
      tooltip: {
        y: {
          formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
            return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
          }
        }
      }
    };

    this.chartOptions8 = {
      series: [],
      title: {
        text: "Bloques Geográficos",
        align: "left"
      },
      chart: {
        height: 350,
        type: "donut"
      },
      labels: [],
      tooltip: {
        y: {
          formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
            return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
          }
        }
      },
      plotOptions: {
        pie: {
          customScale: 0.8
        }
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

    this.chartOptions9 = {
      series: [ ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top",
            formatter: function (val:any, opt:any) {
              return formatoNumeroPipe.localeStringStaticCutDecimal(val, 2);    
            },
             // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val:any, opt:any) {
          return formatoNumeroPipe.localeStringStaticCutDecimal(val, 2)+"%";    
        },
        offsetY: -20,
        style: {
          fontSize: "16px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [],
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
        text: "Agrupación de países por acuerdos comerciales",
        align: "left"
      },
      tooltip: {
        y: {
          formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
            return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
          }
        }
      }
    };
    

    this.getLists();
    this.getGraph();
    
   }

  ngOnInit(): void {
    this.getLists();
  }



  printPage() {
    this.print = true;
    window.print();
  }

  onChangePeriodo(event:any){
    this.filterFormodel.extraPeriodo=0;
    
    this._periodosExtra= this.periodosExtra.filter((pe: any) => {

      if (pe.periodo_id === this.filterFormodel.periodoID) {

        let mes_corte= this.mesCorte;
        if (this.filterFormodel.anioConsulta < this.yearmax) {
          mes_corte= 12;
        }


        if (mes_corte>=pe.mescortemin && (mes_corte<=pe.mescortemax || mes_corte>=pe.mescortemax)) {
          return true;
        }
      }
      return  false;
    });
     
  }
  rankexpnac (graficaConsulta:number){


    switch (graficaConsulta) {
      case 1:
        let data_series: any[]= [];
        let data_categories: any[]= [];
        
        if (this.rankings!=null) {
          this.rankings.forEach((element:any) => {
            data_series.push(element.fobdolares);
            data_categories.push(element.departament.split(' '));
          });
        }
        

        this.count_ranking = (this.rankings!=null) ?this.rankings.length:null;

       

        this.rank_dep=  ( this.rankings!=null)? this.rankings.find((rank: any) => {
          return rank.id === this.filterFormodel.departamentoID;
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
            height: 500,
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
              minHeight: 120,
              maxHeight: 200,
              showDuplicates: false,
              trim: false,
     
              style: {
                  colors: [],
                  fontSize: '16px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  margin: 2
              },
              offsetX: 0,
              offsetY: 0,
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
            },
            y: {
              formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
                return 'US$ '+formatoNumeroPipe.localeStringStaticCutDecimal(value, 2)+' FOB Millones';  
              }
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


        let series: any[]= [];
 

        this.fobDepartamentos?.forEach((element:any) => {
          if (series[element.categoriaID] == undefined) {
            series[element.categoriaID] = {
              'name':element.categoria,
              'data': []
            }
          }
        });


        if (this.fobDepartamentos!=null) {
          this.fobDepartamentos.forEach((element:any) => {
            fob_categoria.push(element.fecha);

            if (series[element.categoriaID].data !== undefined) {
              series[element.categoriaID].data.push(element.fobdolares);
            }            
          });
        }


        let result_cat = fob_categoria.sort().filter((item,index)=>{
          return fob_categoria.indexOf(item) === index;
        })
        


        this.chartOptions3 = {
          series: series.filter(item => item).sort(),
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true,
                customIcons: []
              },     
              autoSelected: 'zoom' 
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function(value:any, { seriesIndex, dataPointIndex, w }: { seriesIndex: any; dataPointIndex:any; w:any }) {
              var total: any = 0;
              w.config.series.forEach((element:any) => {    
                            
                  total= total+ ((element.data[dataPointIndex]!=undefined)? element.data[dataPointIndex]:0);                  
                            
              });
              return  formatoNumeroPipe.localeStringStaticCutDecimal((value*100/total), 2) +'%';
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
          tooltip: {
            y: {
              formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
                return 'US$ '+ formatoNumeroPipe.localeStringStaticCutDecimal(value, 2) + ' FOB Millones';  
              }
            }
          },
          xaxis: {
            type: "category",
            categories: result_cat
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
          legend: {
            position: "bottom",
            // offsetY: 10
          },
          fill: {
            opacity: 1
          }
        };


        let kilo_categoria: any[]= [];   

        let series2: any[]= [];
        

        this.kilosNetos?.forEach((element:any) => {
          if (series2[element.categoriaID] == undefined) {
            series2[element.categoriaID] = {
              'name':element.categoria,
              'data': []
            }
          }
        });


        if (this.kilosNetos!=null) {
          this.kilosNetos.forEach((element:any) => {
            kilo_categoria.push(element.fecha);

            if (series2[element.categoriaID].data !== undefined) {
              series2[element.categoriaID].data.push(element.kilosnetos);
            }
            
          });
        }

 


             

        

        let result_cat_kl = kilo_categoria.sort().filter((item,index)=>{
          return kilo_categoria.indexOf(item) === index;
        })

        this.chartOptions2 = {
          series: series2.filter(item => item).sort(),
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
          tooltip: {
            y: {
              formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
                return '$ '+formatoNumeroPipe.localeStringStaticCutDecimal(value, 2)+ '';  
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            position: "bottom",
          },
          grid: {
            show: false
          },
          yaxis: {
            labels: {
              show: false,
                 formatter: function(val:any, index:any) {
                return formatoNumeroPipe.localeStringStaticCutDecimal(val, 2);    
              }
            }
          },
          xaxis: {
            categories: result_cat_kl,
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
                fontSize: "16px"
              }
            }
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
    
          title: {
            text: "Capítulos Arancelarios",
            align: "left"
          },
          tooltip: {
            y: {
              formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
                return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
              }
            }
          }
          
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

    
          title: {
            text: "Intensidad tecnológica",
            align: "left"
          },
          subtitle: {
            text: "178,080",
            align: "left"
          },
          labels: categoria4,
          tooltip: {
            y: {
              formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
                return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
              }
            }
          }

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
            type: "donut"
          },
          title: {
            text: "Países",
            align: "left"
          },
          tooltip: {
            y: {
              formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
                return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
              }
            }
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
          ],
          labels: categoria5
        };
        break;   
        
        case 6:
          let valor6: any[]= [];       
          let categoria6: any[]= [];

        if (this.bloquesGeoDept!=null) {
          this.bloquesGeoDept.forEach((element:any) => {
            valor6.push(element.numExportadoras);
            categoria6.push(element.bloque);
          });
        }


         this.chartOptions8 = {
          series: valor6,
          title: {
            text: "Bloques Geográficos",
            align: "left"
          },
          chart: {
            height: 350,
            type: "donut"
          },
          tooltip: {
            y: {
              formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
                return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
              }
            }
          },
          labels: categoria6,
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
          
        break;

        case 7:

          let valor7: any[]= [];       
          let categoria7: any[]= [];

        if (this.acuerdosComerciales!=null) {
          this.acuerdosComerciales.forEach((element:any) => {
            valor7.push(element.participacion);
            categoria7.push(element.acuerdo);
          });
        }
        
          this.chartOptions9 = {
            series: [
              {
                name: "",
                data: valor7
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
            tooltip: {
              y: {
                formatter: function(value:any, { series, seriesIndex, dataPointIndex, w }: { series: any; seriesIndex: any; dataPointIndex:any; w:any }) {
                  return formatoNumeroPipe.localeStringStaticCutDecimal(value, 2);  
                }
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val:any, opt:any) {
                return formatoNumeroPipe.localeStringStaticCutDecimal(val, 2);    
              },     
            },
      
            xaxis: {
              categories: categoria7,
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
              text: "Agrupación de países por acuerdos comerciales",
              align: "left"
            }
          };
          break;
      default:
        break;
    }
    
    

  }

  getLists(){
    this.infoDepartamentoService.getAllFilter().subscribe((response) => {   
 
      this.departamentos= response.departamentos.sort((a:any, b:any) => a.departamento.localeCompare(b.departamento));;
      this.periodos= response.periodos;
      this.categorias = response.categorias;
      this.mesCorte= response.mescorte;
      this.yearmax= response.añomax;

      this.filterFormodel.anioConsulta = this.yearmax;

      this.years = [];
      for (let index = response.añomin; index <= response.añomax; index++) {        
        this.years.push(index);        
      }

     
    },  
    (error) => {
      console.log('error', error);
    }
    );
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
    this.sendFilter(2, 1);
    this.sendFilter(3);
    this.sendFilter(4);
    this.sendFilter(5);
    this.sendFilter(6);
    this.sendFilter(7);
 }

  

  sendFilter(graficaConsulta:number, categoriaFiltro:number | string = 0 , graficaFiltro:number | string = 0){

    this.loading= true;
    this.filterFormodel.graficaConsulta= graficaConsulta;
    this.filterFormodel.categoriaFiltro= categoriaFiltro;

    if (this.departamentos !=undefined ) {
      this.departamento=  this.departamentos.find((depa: any) => {
        return depa.id === this.filterFormodel.departamentoID;
      });

    }else{
      this.departamento= null;
    }


    

    this.infoDepartamentoService.postFilter(this.filterFormodel).subscribe((response) => {  

         
      switch (graficaConsulta) {
        case 1:

            switch (graficaFiltro) {
              case 1:
                this.balanceDto = response.balanceDto;
                break;

              case 2:
                this.rankings = (response.rankings!=null) ? response.rankings.sort((a:any, b:any) => (a.rank < b.rank ? -1 : 1)): null;
                break;  
            
              default:
                this.balanceDto = response.balanceDto;
                this.resultadosGeneralesDto = response.resultadosGeneralesDto;
                this.rankings = (response.rankings!=null) ? response.rankings.sort((a:any, b:any) => (a.rank < b.rank ? -1 : 1)): null;
                break;
            }          
      
          
          break;
        
        case 2:

            switch (graficaFiltro) {
              case 3:
                this.fobDepartamentos= response.fobDepartamentos;
                break;

              case 4:
                this.kilosNetos= response.kilosNetos;
                break;  
            
              default:
                this.fobDepartamentos= response.fobDepartamentos;
                this.kilosNetos= response.kilosNetos;
                break;
            }
                
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

        case 7:
          this.acuerdosComerciales= response.acuerdosComerciales?.sort((a:any, b:any) => parseFloat(b.participacion) - parseFloat(a.participacion));
                   
          break;

        default:
          break;
      }
      this.loading= false;
      
      this.rankexpnac(graficaConsulta);


      this.periodo=  (this.periodos!=undefined)? this.periodos.find((pera: any) => {
        return pera.id === this.filterFormodel.periodoID;
      }): null;

      this.filterFormodelGraph.categoriaID = 0;
      
    },
    (error) => {
      this.loading= false;
      console.log('error', error);
    }
    );
    
  }

  open(content:any, modalHeader:string, graficaConsulta:number = 1) {
    this.modalHeader= modalHeader;
    this._graficaConsulta= graficaConsulta;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  filterGraph(graficaConsulta:number){

    
      switch (graficaConsulta) {
        case 1:
          this.balanceDto = null;         
          this.sendFilter(1, this.filterFormodelGraph.categoriaID, 1);    
          this.modalService.dismissAll();      
          break;

        case 2:            
            this.rankings = null;
            this.sendFilter(1, this.filterFormodelGraph.categoriaID, 2);    
            this.modalService.dismissAll();      
            break;  
      
        case 3:
          this.fobDepartamentos= null;         
          this.sendFilter(2, this.filterFormodelGraph.categoriaID, 3);
          this.modalService.dismissAll();
          break;

        case 4:       
            this.kilosNetos= null;
            this.sendFilter(2, this.filterFormodelGraph.categoriaID, 4);
            this.modalService.dismissAll();
            break;   
        
        case 5:
          this.capitulosArancelariosDept= null;
          this.intensidadTecno=null;
          this.sendFilter(3, this.filterFormodelGraph.categoriaID, 5);
          this.sendFilter(4, this.filterFormodelGraph.categoriaID, 5);
          this.modalService.dismissAll();
          break;
        
        case 6:
          this.paises=  null;
          this.bloquesGeoDept=  null;
          this.acuerdosComerciales= null;
          this.sendFilter(5, this.filterFormodelGraph.categoriaID, 6);
          this.sendFilter(6, this.filterFormodelGraph.categoriaID, 6);
          this.sendFilter(7, this.filterFormodelGraph.categoriaID, 6);
          this.modalService.dismissAll();
          break  
      }
      

      
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



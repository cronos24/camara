import { environment } from './../../../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {
  @ViewChild('editModal') editModal: ElementRef | any;
   
  closeResult: string | undefined;
  filtered_menu: { id: number; etiqueta: string; icono: string; leyenda: string; orden:number; url: string; }[] | undefined;
  form_menu: any;
  scenario:any= '';
  //menus: { id: number, etiqueta: string, icono: string, leyenda: string, orden:number, url: string; }[]
  menus: any[] = [];
  iconos: string[];
  

  constructor(private readonly fb: FormBuilder,private modalService: NgbModal, private httpClient: HttpClient,private router: Router) {
    this.form_menu = this.fb.group({
      id: [''], 
      etiqueta: ['', Validators.required],      
      icono: ['', Validators.required],
      leyenda:['', Validators.required],
      orden:[''],
      url:['', Validators.required],
    });

    this.menus = [];

    this.iconos = ["fas fa-address-book","fas fa-address-card","fas fa-adjust","fas fa-align-center","fas fa-align-justify","fas fa-align-left","fas fa-align-right","fas fa-allergies","fas fa-ambulance","fas fa-american-sign-language-interpreting","fas fa-anchor","fas fa-angle-double-down","fas fa-angle-double-left","fas fa-angle-double-right","fas fa-angle-double-up","fas fa-angle-down","fas fa-angle-left","fas fa-angle-right","fas fa-angle-up","fas fa-archive","fas fa-arrow-alt-circle-down","fas fa-arrow-alt-circle-left","fas fa-arrow-alt-circle-right","fas fa-arrow-alt-circle-up","fas fa-arrow-circle-down","fas fa-arrow-circle-left","fas fa-arrow-circle-right","fas fa-arrow-circle-up","fas fa-arrow-down","fas fa-arrow-left","fas fa-arrow-right","fas fa-arrow-up","fas fa-arrows-alt","fas fa-arrows-alt-h","fas fa-arrows-alt-v","fas fa-assistive-listening-systems","fas fa-asterisk","fas fa-at","fas fa-audio-description","fas fa-backward","fas fa-balance-scale","fas fa-ban","fas fa-band-aid","fas fa-barcode","fas fa-bars","fas fa-baseball-ball","fas fa-basketball-ball","fas fa-bath","fas fa-battery-empty","fas fa-battery-full","fas fa-battery-half","fas fa-battery-quarter","fas fa-battery-three-quarters","fas fa-bed","fas fa-beer","fas fa-bell","fas fa-bell-slash","fas fa-bicycle","fas fa-binoculars","fas fa-birthday-cake","fas fa-blind","fas fa-bold","fas fa-bolt","fas fa-bomb","fas fa-book","fas fa-bookmark","fas fa-bowling-ball","fas fa-box","fas fa-box-open","fas fa-boxes","fas fa-braille","fas fa-briefcase","fas fa-briefcase-medical","fas fa-bug","fas fa-building","fas fa-bullhorn","fas fa-bullseye","fas fa-burn","fas fa-bus","fas fa-calculator","fas fa-calendar","fas fa-calendar-alt","fas fa-calendar-check","fas fa-calendar-minus","fas fa-calendar-plus","fas fa-calendar-times","fas fa-camera","fas fa-camera-retro","fas fa-capsules","fas fa-car","fas fa-caret-down","fas fa-caret-left","fas fa-caret-right","fas fa-caret-square-down","fas fa-caret-square-left","fas fa-caret-square-right","fas fa-caret-square-up","fas fa-caret-up","fas fa-cart-arrow-down","fas fa-cart-plus","fas fa-certificate","fas fa-chart-area","fas fa-chart-bar","fas fa-chart-line","fas fa-chart-pie","fas fa-check","fas fa-check-circle","fas fa-check-square","fas fa-share","fas fa-share-alt","fas fa-share-alt-square","fas fa-share-square","fas fa-shekel-sign","fas fa-shield-alt","fas fa-ship","fas fa-shipping-fast","fas fa-shopping-bag","fas fa-shopping-basket","fas fa-shopping-cart","fas fa-shower","fas fa-sign","fas fa-sign-in-alt","fas fa-sign-language","fas fa-sign-out-alt","fas fa-signal","fas fa-sitemap","fas fa-sliders-h","fas fa-smile","fas fa-smoking","fas fa-snowflake","fas fa-sort","fas fa-sort-alpha-down","fas fa-sort-alpha-up","fas fa-sort-amount-down","fas fa-sort-amount-up","fas fa-sort-down","fas fa-sort-numeric-down","fas fa-sort-numeric-up","fas fa-sort-up","fas fa-space-shuttle","fas fa-spinner","fas fa-square","fas fa-square-full","fas fa-star","fas fa-star-half","fas fa-step-backward","fas fa-step-forward","fas fa-stethoscope","fas fa-sticky-note","fas fa-stop","fas fa-stop-circle","fas fa-stopwatch","fas fa-street-view","fas fa-strikethrough","fas fa-subscript","fas fa-subway","fas fa-suitcase","fas fa-sun","fas fa-superscript","fas fa-sync","fas fa-sync-alt","fas fa-syringe","fas fa-table","fas fa-table-tennis","fas fa-tablet","fas fa-tablet-alt","fas fa-tablets","fas fa-tachometer-alt","fas fa-tag","fas fa-tags","fas fa-tape","fas fa-tasks","fas fa-taxi","fas fa-terminal","fas fa-text-height","fas fa-text-width","fas fa-th","fas fa-th-large","fas fa-th-list","fas fa-thermometer","fas fa-thermometer-empty","fas fa-thermometer-full","fas fa-thermometer-half","fas fa-thermometer-quarter","fas fa-thermometer-three-quarters","fas fa-thumbs-down","fas fa-thumbs-up","far fa-hand-point-left","far fa-hand-point-right","far fa-hand-point-up","far fa-hand-pointer","far fa-hand-rock","far fa-hand-scissors","far fa-hand-spock","far fa-handshake","far fa-hdd","far fa-heart","far fa-hospital","far fa-hourglass","far fa-id-badge","far fa-id-card","far fa-image","far fa-images","far fa-keyboard","far fa-lemon","far fa-life-ring","far fa-lightbulb","far fa-list-alt","far fa-map","far fa-meh","far fa-minus-square","far fa-money-bill-alt","far fa-moon","far fa-newspaper","far fa-object-group","far fa-object-ungroup","far fa-paper-plane","far fa-pause-circle","far fa-play-circle","far fa-plus-square","far fa-question-circle","far fa-registered","far fa-save","far fa-share-square","far fa-smile","far fa-snowflake","far fa-square","far fa-star","far fa-star-half","far fa-sticky-note","far fa-stop-circle","far fa-sun","far fa-thumbs-down","far fa-thumbs-up","far fa-times-circle","far fa-trash-alt","far fa-user","far fa-user-circle","far fa-window-close","far fa-window-maximize","far fa-window-minimize","far fa-window-restore","fab fa-500px","fab fa-accessible-icon","fab fa-accusoft","fab fa-adn","fab fa-adversal","fab fa-affiliatetheme","fab fa-algolia","fab fa-amazon","fab fa-amazon-pay","fab fa-amilia","fab fa-android","fab fa-angellist","fab fa-angrycreative","fab fa-angular","fab fa-app-store","fab fa-app-store-ios","fab fa-apper","fab fa-apple","fab fa-apple-pay","fab fa-asymmetrik","fab fa-audible","fab fa-autoprefixer","fab fa-avianex","fab fa-aviato","fab fa-aws","fab fa-bandcamp","fab fa-behance","fab fa-behance-square","fab fa-bimobject","fab fa-bitbucket","fab fa-bitcoin","fab fa-bity","fab fa-black-tie","fab fa-blackberry","fab fa-blogger","fab fa-blogger-b","fab fa-bluetooth","fab fa-bluetooth-b","fab fa-btc","fab fa-buromobelexperte","fab fa-buysellads","fab fa-cc-amazon-pay","fab fa-cc-amex","fab fa-cc-apple-pay","fab fa-cc-diners-club","fab fa-cc-discover","fab fa-cc-jcb","fab fa-cc-mastercard","fab fa-cc-paypal","fab fa-cc-stripe","fab fa-cc-visa","fab fa-centercode","fab fa-chrome","fab fa-cloudscale","fab fa-cloudsmith","fab fa-cloudversify","fab fa-codepen","fab fa-codiepie","fab fa-connectdevelop","fab fa-contao","fab fa-cpanel","fab fa-creative-commons","fab fa-css3","fab fa-css3-alt","fab fa-cuttlefish","fab fa-d-and-d","fab fa-dashcube","fab fa-delicious","fab fa-deploydog","fab fa-deskpro","fab fa-deviantart","fab fa-digg","fab fa-digital-ocean","fab fa-discord","fab fa-discourse","fab fa-dochub","fab fa-docker"
    ];
   }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(){

    this.httpClient.get<any>(environment.apiUrl+'/api/Menu/CargarDatos').subscribe(
      (data) => {
      
         if (data.length >0 ) {
          this.menus= data.sort((a:any, b:any) => (a.orden < b.orden ? -1 : 1));
         }else{
          Swal.fire({
            title: 'Error!',
            text:'No se encontraron menus en la base de dados',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
          })
         }
         
                   
      },
      (err: HttpErrorResponse) => {
    
          if (err.error instanceof Error) {
              console.log('Client-side error occured.', err);
              Swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000,
                timerProgressBar: true,
              })
          } else {
            Swal.fire({
              title: 'Error!',
              text: err.message,
              icon: 'error',
              confirmButtonText: 'OK',
              timer: 3000,
              timerProgressBar: true,
            })
              console.log('Server-side error occured.', err);
          }
      }
    );
  }

  editMenu(content: any,id:number){
    this.scenario= "Editar";
    this.filtered_menu = this.menus.filter(m => m.id===id);   

    this.form_menu.patchValue(this.filtered_menu[0]);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  crearMenu(content: any){

    this.form_menu.reset();
    
    


    console.log(this.menus);
    console.log(this.form_menu.getRawValue());
    

    this.scenario= "Crear";
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  submitForm() {
    if (this.form_menu.valid) {

      switch (this.scenario) {
        case "Crear":

          let new_menu= { etiqueta: this.form_menu.getRawValue().etiqueta, icono: this.form_menu.getRawValue().icono, leyenda: this.form_menu.getRawValue().leyenda, orden: this.menus.length+1, url: this.form_menu.getRawValue().url }

          this.httpClient.post<any>(environment.apiUrl+'/api/Menu/GuardarMenus', [new_menu]).subscribe(
            (data) => {

              console.log('data', data);
              
            
              if (data.status==200) {

                Swal.fire({
                  icon: 'success',            
                  title: 'Ok!!!',
                  text: data.message,
                  timer: 1000,
                  timerProgressBar: true,
                }); 

                setTimeout(() => { 
                  this.menus.push(new_menu);
                }, 500);

                
                
              }else{
                Swal.fire({
                  icon: 'info',            
                  title: 'UPS!!!',
                  text: data.message,
                  timer: 1000,
                  timerProgressBar: true,
                }); 
              }
               
             
               
                         
            },
            (err: HttpErrorResponse) => {
          
                if (err.error instanceof Error) {
                    console.log('Client-side error occured.', err);
                    Swal.fire({
                      title: 'Error!',
                      text: err.message,
                      icon: 'error',
                      confirmButtonText: 'OK',
                      timer: 3000,
                      timerProgressBar: true,
                    })
                } else {
                  Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    timer: 3000,
                    timerProgressBar: true,
                  })
                    console.log('Server-side error occured.', err);
                }
            }
          );
          
          break;

        case "Editar":
          if (this.filtered_menu!=undefined) {

            this.httpClient.post<any>(environment.apiUrl+'/api/Menu/GuardarMenus', [this.form_menu.getRawValue()]).subscribe(
              (data) => {
              
                if (data.status==200) {

                  Swal.fire({
                    icon: 'success',            
                    title: 'Ok!!!',
                    text: data.message,
                    timer: 1000,
                    timerProgressBar: true,
                  }); 

                  setTimeout(() => { 
                    let index_menu= this.menus.findIndex(x => x.id === this.form_menu.getRawValue().id);
                  this.menus[index_menu]=  this.form_menu.getRawValue();
                  }, 500);
                  
                  
                }else{
                  Swal.fire({
                    icon: 'info',            
                    title: 'UPS!!!',
                    text: data.message,
                    timer: 1000,
                    timerProgressBar: true,
                  }); 
                }
                 
               
                 
                           
              },
              (err: HttpErrorResponse) => {
            
                  if (err.error instanceof Error) {
                      console.log('Client-side error occured.', err);
                      Swal.fire({
                        title: 'Error!',
                        text: err.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        timer: 3000,
                        timerProgressBar: true,
                      })
                  } else {
                    Swal.fire({
                      title: 'Error!',
                      text: err.message,
                      icon: 'error',
                      confirmButtonText: 'OK',
                      timer: 3000,
                      timerProgressBar: true,
                    })
                      console.log('Server-side error occured.', err);
                  }
              }
            );
        
            
    
            
          }
          break;  
      
     
      }

     

      this.modalService.dismissAll();
      
      console.log(this.form_menu.getRawValue());
      
    } else {
        console.log('There is a problem with the form');
    }
    
  }

  borrarMenu(content: any,id:number){
    this.menus.splice(this.menus.findIndex(item => item.id === id), 1)
  }  

  drop(event: any) {
    moveItemInArray(this.menus, event.previousIndex, event.currentIndex);
    this.menus.forEach((value, index) => {
      value.orden = index+1;                     
    });

    console.log(this.menus);
    
    
  }

  open(content: any) {
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
      return  `with: ${reason}`;
    }
  }

}

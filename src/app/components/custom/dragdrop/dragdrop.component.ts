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
 

  title = 'appBootstrap';
  
  closeResult: string | undefined;
  filtered_menu: { id: number; etiqueta: string; icono: string; leyenda: string; orden:number; url: string; }[] | undefined;
  form_menu: any;
  scenario:any= '';
  //menus: { id: number, etiqueta: string, icono: string, leyenda: string, orden:number, url: string; }[]
  menus: any[] = [];

  constructor(private readonly fb: FormBuilder,private modalService: NgbModal, private httpClient: HttpClient,private router: Router) {
    this.form_menu = this.fb.group({
      id: [''], 
      etiqueta: ['', Validators.required],      
      icono: ['', Validators.required],
      leyenda:['', Validators.required],
      orden:['', Validators.required],
      url:['', Validators.required],
    });

    this.menus = [];
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
          this.menus.push({ id:this.menus.length+1, etiqueta: this.form_menu.getRawValue().etiqueta, icono: this.form_menu.getRawValue().icono, leyenda: this.form_menu.getRawValue().leyenda, orden: this.form_menu.getRawValue().orden, url: this.form_menu.getRawValue().url });
          break;

        case "Editar":
          if (this.filtered_menu!=undefined) {
        
            let index_menu= this.menus.findIndex(x => x.id === this.form_menu.getRawValue().id);
            this.menus[index_menu]=  this.form_menu.getRawValue();
    
            
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

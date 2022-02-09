import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {
  @ViewChild('editModal') editModal: ElementRef | any;
  menus = [
    {
      id:1,
      nombre: "Informe por departamento",
      icono: "fas fa-globe-americas",
      subtitulo: "Comercio exterior por departamento",
      url:"www.compite360.com/link1"
    },
    {
      id:2,
      nombre: "Productos",
      icono: "fas fa-cog",
      subtitulo: "Selección de Capítulos y Posiciones arancelarias",
      url:"www.compite360.com/link2"
    },
    {
      id:3,
      nombre: "Destinos",
      icono: "fas fa-cog",
      subtitulo: "Selección de países",
      url:"www.compite360.com/link3"
    },  
    {
      id:4,
      nombre: "Empresas",
      icono: "fas fa-cog",
      subtitulo: "Desarrollo de empresas exportadoras",
      url:"www.compite360.com/link4"
    },  
  ];

  title = 'appBootstrap';
  
  closeResult: string | undefined;
  filtered_menu: { id: number; nombre: string; icono: string; subtitulo: string; url: string; }[] | undefined;
  form_menu: any;
  scenario:any= '';

  constructor(private readonly fb: FormBuilder,private modalService: NgbModal) {
    this.form_menu = this.fb.group({
      id: [''], 
      nombre: ['', Validators.required],      
      icono: ['', Validators.required],
      subtitulo:['', Validators.required],
      url:['', Validators.required],
    });
   }

  ngOnInit(): void {
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
          this.menus.push({ id:this.menus.length+1, nombre: this.form_menu.getRawValue().nombre, icono: this.form_menu.getRawValue().icono, subtitulo: this.form_menu.getRawValue().subtitulo, url: this.form_menu.getRawValue().url });
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

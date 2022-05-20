import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: any[] = [];
  
  constructor( private httpClient: HttpClient,private router: Router) { }

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


}

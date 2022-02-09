import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form_login: FormGroup;
  send:boolean=false;
  constructor(private readonly fb: FormBuilder,private router: Router, private httpClient: HttpClient) { 
    this.form_login = this.fb.group({
      email: ['dianac.rueda', Validators.required],      
      clave: ['Compite360.2022', Validators.required],
      savepassword:[]
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.form_login.valid) {
      this.form_login.disable();
      this.send= true;
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8'); 

      this.httpClient.post(environment.apiUrl+'/api/Login', this.form_login.getRawValue(), {headers: headers}).subscribe(
        (data) => {


            Swal.fire({
              icon: 'success',            
              title: 'Has iniciado sesión',
              text: data.toString(),
              timer: 1000,
              timerProgressBar: true,
            }); 
  
                  
            setTimeout(() => { 
              this.send= false;
              this.form_login.enable();
              this.router.navigate(['/custom/dragdrop']);
            }, 1000);
            
           
        },
        (err: HttpErrorResponse) => {
          this.send= false;
          this.form_login.enable();
            if (err.error instanceof Error) {
                console.log('Client-side error occured.', err.message);
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
                text: err.error.error.message,
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000,
                timerProgressBar: true,
              })
                console.log('Server-side error occured.', err);
            }
        }
    );


     
    } else {
        console.log('There is a problem with the form');
    }
    
  }

}

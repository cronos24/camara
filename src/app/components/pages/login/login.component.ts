import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2'
import { LoginService } from 'src/app/services/pages/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form_login: FormGroup;
  send:boolean=false;
  constructor(private readonly fb: FormBuilder,private router: Router, private loginService: LoginService) { 
    this.form_login = this.fb.group({
      email: ['', Validators.required],      
      clave: ['', Validators.required],
      savepassword:[]
    });
  }

  ngOnInit(): void {
    if (this.loginService.getUserLoggedIn()) {
      this.router.navigate(['home']); // if user was logged in before, redirect to default landing page
    }
  }

  submitForm() {
    if (this.form_login.valid) {
      this.form_login.disable();
      this.send= true;
      let headers = new HttpHeaders();
      //headers = headers.set('Content-Type', 'application/json; charset=utf-8'); 

      this.loginService.signIn(this.form_login.getRawValue()).subscribe((response) => {  
      
        this.loginService.setUserLoggedIn();
                  
        Swal.fire({
          icon: 'success',            
          title: 'Has iniciado sesión',
          text: response.info,
          timer: 1000,
          timerProgressBar: true,
        }); 

              
        setTimeout(() => { 
          this.send= false;
          this.form_login.enable();
          this.router.navigate(['/custom/dragdrop']);
        }, 1000);
        
      },
      (error: HttpErrorResponse) => {

        console.log('error', error);
        this.send= false;
          this.form_login.enable();
            if (error.error instanceof Error) {
                console.log('Client-side error occured.', error);
                Swal.fire({
                  title: 'Error!',
                  text: error.message,
                  icon: 'error',
                  confirmButtonText: 'OK',
                  timer: 3000,
                  timerProgressBar: true,
                })
            } else {
              Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
                timer: 3000,
                timerProgressBar: true,
              })
                console.log('Server-side error occured.', error);
            }
      }
      );

     


     
    } else {
        console.log('There is a problem with the form');
    }
    
  }

}

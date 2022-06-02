import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { LoginService } from './services/pages/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login: boolean = false;
  isOpen: boolean= false;

  constructor(public loginService: LoginService, public appService: AppService) {
    this.getComexUrl(72);
  }

  title = 'login';
  url_logo= '#';

  Logout(event: Event): void {
    event.preventDefault(); // Prevents browser following the link
      this.loginService.setUserLoggedOut();
  
  }

  click(){
    this.isOpen = false;
  }

  getComexUrl(id:any){
    this.appService.getComexUrl(id).subscribe((response) => {   
       this.url_logo= response.url;      
    },
    (error) => {
      console.log('error', error);
    }
    );
  }

  
}

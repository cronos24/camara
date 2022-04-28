import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/pages/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login: boolean = false;
  isOpen: boolean= false;

  constructor(public loginService: LoginService) {}

  title = 'login';

  Logout(event: Event): void {
    event.preventDefault(); // Prevents browser following the link
      this.loginService.setUserLoggedOut();
  
  }

  click(){
    this.isOpen = false;
  }

  
}

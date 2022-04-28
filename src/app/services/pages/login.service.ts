import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isBorwser: boolean = false;
  isUserLoggedIn: string;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any , private router: Router) {
      this.isBorwser = isPlatformBrowser(this.platformId);
      this.isUserLoggedIn = '0';
      localStorage.setItem('login',this.isUserLoggedIn);
     }


    signIn(model:any): Observable<any> {
      return this.http.post<any[]>(environment.apiUrl + '/api/Login', model);
    }
  
    // logOut(){
    //   localStorage.clear();
    //   this.router.navigate(['/home']);
    //   return false;
    // }

    // checkLogin(): boolean {
    //   if (localStorage.getItem('login')=='1') { 
    //     return true; 
    //   }else{
    //     this.router.navigate(['/login']);
    //     return false;
    //   }    
      
    // }

    setUserLoggedIn() {
      this.isUserLoggedIn = '1';
      localStorage.setItem('login',this.isUserLoggedIn);
    }
    getUserLoggedIn() {
      return ((localStorage.getItem('login') != null && localStorage.getItem('login') != undefined) ? (localStorage.getItem('login') == '1' ? true:false) : false);
    }
    setUserLoggedOut() {
       this.isUserLoggedIn = '0';
      // localStorage.setItem('login',this.isUserLoggedIn);
      localStorage.clear();
      this.router.navigate(['/home']);
      return false;
    }
    
}

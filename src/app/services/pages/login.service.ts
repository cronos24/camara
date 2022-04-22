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
  isLogin: boolean = false;
  isBorwser: boolean = false;
  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any , private router: Router) {
      this.isBorwser = isPlatformBrowser(this.platformId);
     }


    signIn(model:any): Observable<any> {
      return this.http.post<any[]>(environment.apiUrl + '/api/Login', model);
    }
  
    logOut(){
      localStorage.clear();
      this.router.navigate(['/home']);
      return false;
    }

    checkLogin(): boolean {
      if (localStorage.getItem('login')=='1') { 
        return true; 
      }else{
        this.router.navigate(['/login']);
        return false;
      }    
      
    }
    
}

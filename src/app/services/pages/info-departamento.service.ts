import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class InfoDepartamentoService {

    isBorwser: boolean = false;
    constructor(private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: any) {
        this.isBorwser = isPlatformBrowser(this.platformId);
       }

    getAllFilter(): Observable<any> {
        return this.http.get<any[]>(environment.apiUrl + '/api/Menu/Filtros');
    }

 
    postFilter(model:any): Observable<any> {
        return this.http.post<any[]>(environment.apiUrl + '/api/ModuloDepartamentos/Consultar', model);
    }

  


}

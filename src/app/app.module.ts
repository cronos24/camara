import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { DragdropComponent } from './components/custom/dragdrop/dragdrop.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'; // add this line
import { AppInterceptor } from './app.interceptor';
import { InfoDepartamentoComponent } from './components/pages/info-departamento/info-departamento.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/pages/home/home.component';
import { ConstruccionComponent } from './components/pages/construccion/construccion.component';
import { formatoNumeroPipe } from './pipes/formato.numero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    DragdropComponent,
    InfoDepartamentoComponent,
    HomeComponent,
    ConstruccionComponent,
    formatoNumeroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    NgbModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule
  ],
  exports:[
    BrowserAnimationsModule,
    DragDropModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { DragdropComponent } from './components/custom/dragdrop/dragdrop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemMenuComponent } from './components/custom/item-menu/item-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http'; // add this line


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    DragdropComponent,
    ItemMenuComponent
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
    HttpClientModule
  ],
  exports:[
    BrowserAnimationsModule,
    DragDropModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragdropComponent } from './components/custom/dragdrop/dragdrop.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MenuComponent } from './components/pages/menu/menu.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'custom/menu', component: MenuComponent },
  { path: 'custom/dragdrop', component: DragdropComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

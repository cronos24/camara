import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragdropComponent } from './components/custom/dragdrop/dragdrop.component';
import { ConstruccionComponent } from './components/pages/construccion/construccion.component';
import { HomeComponent } from './components/pages/home/home.component';
import { InfoDepartamentoComponent } from './components/pages/info-departamento/info-departamento.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pages/info-departamento' },
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: 'pages/info-departamento' },
  { path: 'construccion', component: ConstruccionComponent },
  { path: 'custom/menu', component: MenuComponent },
  { path: 'custom/dragdrop', component: DragdropComponent, canActivate: [AuthGuard] },
  { path: 'pages/info-departamento', component: InfoDepartamentoComponent },
  { path: '**', redirectTo: 'construccion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

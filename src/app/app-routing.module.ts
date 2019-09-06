import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { JuegoComponent } from './juego/juego.component';
import { RegistroComponent } from './juego/registro/registro.component';
import { LoginComponent } from './usuarios/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { RolGuard } from './guards/rol.guard';

const routes: Routes = [
  {path: '', component: InicioComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'juego', component: JuegoComponent,canActivate: [AuthGuard]},
  {path: 'registrar', component: RegistroComponent,canActivate: [AuthGuard, RolGuard]},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

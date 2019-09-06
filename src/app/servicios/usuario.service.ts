import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/Usuario';

@Injectable({
providedIn: "root"
})
export class UsuariosService {

  url: string = 'http://127.0.0.1:3333/';
  constructor(private request: HttpClient) { }

  registrarUsuario(usuario: any): Observable<Usuario>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.post<Usuario>(this.url + 'registrar-usuario', usuario, {headers:headers});
  }

  iniciarSesion(email: string, password: string){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.post(this.url+"login", {email: email, password: password}, {headers:headers});
  }
}
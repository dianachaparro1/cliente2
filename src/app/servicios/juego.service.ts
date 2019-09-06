import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../modelos/Pregunta';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  url: string = 'http://localhost:3333/';
  constructor(private request: HttpClient) { }

  registrarPregunta(juego: any): Observable<Pregunta[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.post<Pregunta[]>(this.url + 'registrar-pregunta', juego, {headers:headers});
  }

  obtenerPreguntas(): Observable<Pregunta[]>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.request.get<Pregunta[]>(this.url + 'obtener-preguntas', {headers:headers});
  }
}

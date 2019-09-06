import { Component, OnInit } from '@angular/core';
import { JuegoService } from 'src/app/servicios/juego.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  pregunta: string;
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  respuesta4: string;

  constructor(private juegoService: JuegoService, private router: Router) { }

  ngOnInit() {  }

  registrarPregunta(){
    if(this.pregunta && this.respuesta1 && this.respuesta2 && this.respuesta3 && this.respuesta4){
      let datos = {pregunta: this.pregunta, respuesta1: this.respuesta1.toLowerCase(), respuesta2: this.respuesta2.toLowerCase(), respuesta3: this.respuesta3.toLowerCase(), respuesta4: this.respuesta4.toLowerCase()};
      this.juegoService.registrarPregunta(datos).subscribe(preguntas =>{
        this.router.navigate(['/']);
      });
    }else { alert('Llene todos los campos.') }
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { JuegoService } from '../servicios/juego.service';
import { Pregunta } from '../modelos/Pregunta';
import { Router } from '@angular/router';
const ws = Ws('ws://localhost:3333');
declare var $: any;

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit, OnDestroy {

  constructor(private juegoService: JuegoService, private router: Router) { }

  pregunta: Pregunta;
  respondidas: number;
  jugadores = [];
  usuario: string;
  puntaje: number;

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    this.pregunta = new Pregunta();   
    this.puntaje = 0;
    this.respondidas = 0;

    ws.connect();
    const canal = ws.subscribe('juego');

      
    canal.on('ready', () => {
      console.log('** ready');
      ws.getSubscription('juego').emit('conectado', this.usuario);
    });
    canal.on('jugadores',(jugadores)=>{
      this.obtenerPregunta();
      console.log('** Jugadores recibidos')
      console.log(jugadores)
      this.jugadores = jugadores;
      for (let i = 0; i < jugadores.length; i++) {
        if(jugadores[i] == this.usuario){
          this.puntaje = jugadores[i+1];
          $('#puntaje').text(this.puntaje);
        }
      }
    });
    canal.on('desconectado',(nombre)=>{
      console.log('** Jugador desconectado');
      alert(nombre+' se ha desconectado!');
      this.resetear();
    });
    canal.on('pregunta',(pregunta)=>{
      console.log('** Pregunta')
      console.log(pregunta)
      this.pregunta = pregunta;
    });
    canal.on('ganador',(nombre)=>{
      alert(nombre+' ha ganado!');
      this.deshabilitarRespuestas();
    });
    canal.on('respondidas',(respondidas)=>{
      console.log('** cantidad de respondidas ' + respondidas);
      this.respondidas = respondidas;
    });

    $(document).ready(() => {
      $('#respuesta').hide();
      $('#btn_participar').hide();
      $('#palomita').hide();
      $('#equis').hide();
      $('#puntaje').text('0');
    });
  }

  verificarGanador(){
    switch(this.respondidas){
      case 1: { break; }
      case 2: { break; }
      case 3: { break; }
      case 4: { break; }
      case 5: {
        let ganador = "";
        if(Number(this.jugadores[1]) > Number(this.jugadores[3])){
          ganador = this.jugadores[0];
        }else{
          ganador = this.jugadores[2];
        }
        ws.getSubscription('juego').emit('ganador', ganador);
        this.deshabilitarRespuestas();
        break;
      }
    }
  }

  ngOnDestroy(): void {
    try{
      ws.getSubscription('juego').emit('desconectado',this.usuario);
      ws.getSubscription('juego').close();
    }catch(e){ console.log(e) }
  }

  obtenerPregunta(){
    this.juegoService.obtenerPreguntas().subscribe(preguntas=>{
      let i = Math.floor((Math.random() * preguntas.length));
      if(this.respondidas == 3){
        $(document).ready(() => {
          $('#puntos').text('ahora son puntos dobles!');
        });
        preguntas[i].puntos_1 = 80;
        preguntas[i].puntos_2 = 70;
        preguntas[i].puntos_3 = 30;
        preguntas[i].puntos_4 = 20;
      }
      if(this.respondidas == 4){
        $(document).ready(() => {
          $('#puntos').text('ahora son puntos triples!');
        });
        preguntas[i].puntos_1 = 120;
        preguntas[i].puntos_2 = 105;
        preguntas[i].puntos_3 = 45;
        preguntas[i].puntos_4 = 30;
      }
      ws.getSubscription('juego').emit('pregunta',preguntas[i]);
    });
  }

  verificarRespuesta(respuesta){
    if(respuesta == this.pregunta.respuesta1){
      this.correcta();
      for (let i = 0; i < this.jugadores.length; i++) {
        if(this.jugadores[i] == this.usuario){
          this.jugadores[i+1] = this.jugadores[i+1]+this.pregunta.puntos_1;
          }
      }
      this.respondidas++;
      ws.getSubscription('juego').emit('jugadores',this.jugadores);
      ws.getSubscription('juego').emit('respondidas',this.respondidas);
      
      this.verificarGanador();
    }
    if(respuesta == this.pregunta.respuesta2){ 
      this.correcta();
      for (let i = 0; i < this.jugadores.length; i++) {
        if(this.jugadores[i] == this.usuario){
          this.jugadores[i+1] = this.jugadores[i+1]+this.pregunta.puntos_2;
        }
      }
      this.respondidas++;
      ws.getSubscription('juego').emit('jugadores',this.jugadores);
      ws.getSubscription('juego').emit('respondidas',this.respondidas);
      
      this.verificarGanador();
    }
    if(respuesta == this.pregunta.respuesta3){
      this.correcta();
      for (let i = 0; i < this.jugadores.length; i++) {
        if(this.jugadores[i] == this.usuario){
          this.jugadores[i+1] = this.jugadores[i+1]+this.pregunta.puntos_3;
        }
      }
      this.respondidas++;
      ws.getSubscription('juego').emit('jugadores',this.jugadores);
      ws.getSubscription('juego').emit('respondidas',this.respondidas);
      
      this.verificarGanador();
    }
    if(respuesta == this.pregunta.respuesta4){
      this.correcta();
      for (let i = 0; i < this.jugadores.length; i++) {
        if(this.jugadores[i] == this.usuario){
          this.jugadores[i+1] = this.jugadores[i+1]+this.pregunta.puntos_4;
        }
      }
      this.respondidas++;
      ws.getSubscription('juego').emit('jugadores',this.jugadores);
      ws.getSubscription('juego').emit('respondidas',this.respondidas);
      
      this.verificarGanador();
    }
  }

  habilitarRespuestas(){
    $(document).ready(() => {
      $("#respuesta1").attr("disabled", false);
      $("#respuesta2").attr("disabled", false);
      $("#respuesta3").attr("disabled", false);
      $("#respuesta4").attr("disabled", false);
    });
  }

  deshabilitarRespuestas(){
    $(document).ready(() => {
      $("#respuesta1").attr("disabled", true);
      $("#respuesta2").attr("disabled", true);
      $("#respuesta3").attr("disabled", true);
      $("#respuesta4").attr("disabled", true);
    });
  }

  resetear(){
    this.deshabilitarRespuestas();
    $(document).ready(() => {
      $('#turno').text('');
      $('label').hide();
    });
    this.puntaje = 0;
  }

  correcta(){
    $( "#palomita" ).first().show( "slow", function showNext() {
      $("#palomita").hide( "slow");
    });
  }
  incorrecta(){
    $( "#equis" ).first().show( "slow", function showNext() {
      $("#equis").hide( "slow");
    });
  }
}
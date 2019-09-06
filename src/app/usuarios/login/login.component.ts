import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private navegar: Router) { }

  // campos de nuevo usuario
  username: string;
  email: string;
  password: string;
  password2: string;
  ngOnInit() {
  }

  registrarUsuario(){
    if((this.username && this.email && this.password && this.password2) && this.password == this.password2){ 
      let usuario = {username: this.username, email: this.email, password: this.password, rol: 'usuario'}
      this.usuariosService.registrarUsuario(usuario).subscribe(usuario => {
        this.usuariosService.iniciarSesion(this.email,this.password).subscribe(response=>{
          let usuario = JSON.stringify(response);
          let us = JSON.parse(usuario);
          localStorage.setItem('token', us.token);
          localStorage.setItem('usuario', us.usuario);
          localStorage.setItem('rol', us.rol);
          window.document.getElementById('cerrar_añadir').click();
          this.navegar.navigate(['/']);
        });
        
      });
    }else{
      alert('Revise su información.');
    }
  }

  ingresar(){
    console.log('iniciando sesion '+this.email + " " + this.password)
    if(this.email && this.password){
      this.usuariosService.iniciarSesion(this.email,this.password).subscribe((response) => {
        let usuario = JSON.stringify(response);
        let us = JSON.parse(usuario);
        localStorage.setItem('token', us.token);
        localStorage.setItem('usuario', us.usuario);
        localStorage.setItem('rol', us.rol);
        this.navegar.navigate(['/']);
      })
    }else{
      alert('complete los campos.')
    }
  }

}

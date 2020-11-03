import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { Cliente } from './models/Cliente';
import { Negocio } from './models/Negocio';
import { NegocioService } from './services/negocio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finanzasTFFront';
  public loggedInNegocio = false ;
  public loggedInCliente = false;
  info:any;
  public negocios = []
  public negocioService:NegocioService
  
  constructor (negocioServices:NegocioService, private cookie:CookieService,private router:Router){
  this.negocioService = negocioServices; 
  if(cookie.get("loggedInNegocio") === "yes"){
    this.loggedInNegocio = true;
    
    this.info = new Negocio();
    this.info = cookie.get("negocio");
    this.info = JSON.parse(cookie.get('negocio'));
    console.log(this.info);
  }
  if(cookie.get("loggedInCliente") === "yes"){
    this.loggedInCliente = true;
    
    this.info = new Cliente();
    
    this.info = cookie.get("cliente");
    this.info = JSON.parse(cookie.get('cliente'));
    console.log(this.info);
  }
   
  }
  
  ngOnInit(){ 
    this.negocioService.getNegocios().subscribe(data=>{this.negocios=data;
    //console.log(this.negocios);
    
  });
    
    //console.log(this.info.id);
  }

  signOut(){
    this.loggedInNegocio = this.loggedInCliente = false;
    this.cookie.deleteAll();
    this.router.navigate(['']);
  }
  
}

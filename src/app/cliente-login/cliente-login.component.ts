import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';
import { Negocio } from '../models/Negocio';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.css']
})
export class ClienteLoginComponent implements OnInit {

  codigoNegocio:string;
  clienteDNI:number;

  constructor(private cookie:CookieService,private appComponent:AppComponent,private router:Router, private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.codigoNegocio = "";
    this.clienteDNI = null;
  }

  validateLogin(){
    let negocio = new Negocio();
    negocio.codigo=this.codigoNegocio;
    let cliente = new Cliente();
    cliente.perfil.dni = this.clienteDNI;
    negocio.clientes.push(cliente);

    if(this.clienteDNI != null && this.codigoNegocio != ""){
      
      this.clienteService.verifyLogin(negocio).subscribe(data=>
        {
          this.appComponent.loggedInCliente = true;
          this.appComponent.info = new Cliente();
          this.appComponent.info = this.clienteService.getClientesByDNI(this.clienteDNI);

          this.cookie.set("cliente",JSON.stringify(data) );
          this.cookie.set("loggedInCliente","yes");
      this.router.navigate(['pagos-cliente']);
      } ,error =>console.log(error.error) )
      
    }
    
  }

}

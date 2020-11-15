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
  cliente:Cliente;
  loading = false;
  valid = true;

  constructor(private cookie:CookieService,private appComponent:AppComponent,private router:Router, private clienteService:ClienteService) { }
  error = ""
  ngOnInit(): void {
    this.clienteDNI = null
    this.codigoNegocio = "";
  }
  isNumberKey(evt){
    console.log(evt.keyCode);
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
      && (charCode < 48 || charCode > 57))
        return false;

    return true;
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
          this.loading = true;
          this.appComponent.loggedInCliente = true;
          this.appComponent.info = new Cliente();

          this.clienteService.getClienteByDNI(this.clienteDNI).subscribe(data =>{
            this.appComponent.info = data.perfil;
        })

          this.cookie.set("cliente",JSON.stringify(data) );
          this.cookie.set("loggedInCliente","yes");
          
          this.router.navigate(['pagos-cliente']);
          
      } ,error =>{this. error = error.error; 
      this.loading = false;
      this.valid = false;})
      
    
    }else{
      this. error = "Por favor ponga sus datos.";
      this.loading = false;
      this.valid = false;
    }
    
  }

}

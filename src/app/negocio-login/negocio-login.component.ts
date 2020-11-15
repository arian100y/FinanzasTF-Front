import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { Negocio } from '../models/Negocio';
import { NegocioService } from '../services/negocio.service';

@Component({
  selector: 'app-negocio-login',
  templateUrl: './negocio-login.component.html',
  styleUrls: ['./negocio-login.component.css']
})
export class NegocioLoginComponent implements OnInit {
  valid = true;
  error = "";
  ruc : number;
  password:string;
  loading = false;
  constructor(private cookie:CookieService,private appComponent:AppComponent, private router:Router,private negocioService:NegocioService) { }

  ngOnInit(): void {
    
    this.ruc = null, this.password = "";
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
    negocio.ruc=this.ruc;
    negocio.password = this.password;
    this.loading = true;
    if(this.ruc != null && this.password != ""){
      this.negocioService.verifyLogin(negocio).subscribe(data=>{
        
        
        this.appComponent.loggedInNegocio = true;
        this.appComponent.info = new Negocio();
        this.appComponent.info.id = data.id;
        this.cookie.set("negocio",JSON.stringify(data) );
        this.cookie.set("loggedInNegocio","yes");
        
      this.router.navigate(['clientes']);
      } ,error =>{this.error = error.error;
        this.loading=false;
      this.valid = false; })
      
    
    }else{
      this. error = "Por favor ponga sus datos.";
      this.loading = false;
      this.valid = false;
    }
    
  }


}

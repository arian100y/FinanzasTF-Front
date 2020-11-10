import { Component, OnInit } from '@angular/core';
import { Negocio } from '../models/Negocio';
import { NegocioService } from '../services/negocio.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styleUrls: ['./registrar-negocio.component.css']
})
export class RegistrarNegocioComponent implements OnInit {

  loading = false;
  errores = {
    nombre:["",false],
    aMaterno:null,
    aPaterno:null,
    dni:null,
    direccion:null,
    moneda:null,
    correo:null,
    telefono:null,
    credito:null,
    fecha:null,
    ruc:null,
    password:null,
    codigo:null
  }
  negocioService :NegocioService;
  negocio : Negocio;
  
  constructor(private negoServ:NegocioService, private router:Router, private appComponent:AppComponent) {
    this.negocioService = negoServ;
    this.negocio = new Negocio();
    this.resetErrors(); 
   }
    
    isNumberKey(evt){
      console.log(evt.keyCode);
      let charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode != 46 && charCode > 31 
        && (charCode < 48 || charCode > 57))
          return false;

      return true;
   }
  ngOnInit(): void {
    
    
  }
  resetErrors(){
    Object.keys(this.errores).forEach(key=>{
      this.errores[key] = ["",false];
    })
  }

  
  checkForm():{}{
    let errors = {}
    if(this.negocio.perfil.nombre === "" || this.negocio.perfil.nombre === null){
      
      errors["nombre"] = ["Nombre no puede estar vacio.", true] 
    }
    if(this.negocio.perfil.apellidoP == ""){
      errors["aPaterno"] = ["Apellido paterno no puede estar vacio.", true] 
    }
    if(this.negocio.perfil.apellidoM == "" ){
      errors["aMaterno"] = ["Apellido materno no puede estar vacio.", true] 
    }
    if( this.negocio.perfil.correo == ""){
      errors["correo"] = ["Correo no puede estar vacio.", true]
    }
    if(this.negocio.perfil.direccion == ""){
      errors["direccion"] = ["Direccion no puede estar vacio.", true]
    }
    if(this.negocio.perfil.dni === null) {
      errors["dni"] = ["DNI no puede estar vacio.", true]
    }else
    if(this.negocio.perfil.dni < 9999999){
      errors["dni"] = ["DNI es menor de 8 digitos.", true]
    }
    if(this.negocio.perfil.telefono === null){
      errors["telefono"] = ["Telefono no puede estar vacio.", true]
    } else if(this.negocio.perfil.telefono < 99999999){
      errors["telefono"] = ["Telefono es menor de 9 digitos.", true]
    } 
    if(this.negocio.ruc == null) {
      errors["ruc"] = ["RUC no puede estar vacio.", true]
    }
    //to-do = ruc max limit
    
    if( this.negocio.password === "" ){
      errors["password"] = ["Password no puede estar vacio.", true]
    } 
    if(this.negocio.codigo == ""){
      errors["codigo"] = ["Codigo de negocio no puede estar vacio.", true]
    } 
  

    
    return errors;
  }

  registerNegocio(){
    this.loading = true;
    let errs = this.checkForm()
    
    if(Object.keys(errs).length === 0){
      this.negocioService.postNegocio(this.negocio).subscribe(data=>{
      
      
      this.router.navigate(['negocio-login']);
    }, (err)=>{
      this.loading = false;
    });

    }else{
      Object.keys(errs).forEach(key=>{
        this.errores[key] = errs[key];
        this.loading = false;
      })
    }
    

  }

}

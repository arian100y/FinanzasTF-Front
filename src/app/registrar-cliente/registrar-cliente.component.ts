import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';
import { Deuda } from '../models/Deuda';
import { Negocio } from '../models/Negocio';
import { RegistrarClienteTasaComponent } from '../registrar-cliente-tasa/registrar-cliente-tasa.component';
import { ClienteService } from '../services/cliente.service';
import { NegocioService } from '../services/negocio.service';

interface Moneda {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {
   
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
    fecha:null
  }

  foods: Moneda[] = [
    {value: 'soles', viewValue: 'Soles'},
    {value: 'dolares', viewValue: 'Dolar'}
  ];
  deuda:Deuda;
  loading = false;
  public cliente:Cliente;

  constructor(private router:Router, 
    private appComponent:AppComponent,private clienteService:ClienteService) { 
      this.cliente = new Cliente();
      this.deuda = new Deuda();
      
      Object.keys(this.errores).forEach(key=>{
        this.errores[key] = ["",false];
      })
      
    }

  ngOnInit(): void { 
    
    
    this.deuda.interes = 0.0;
    this.deuda.monto = 0.0;
    this.deuda.pagado = false;
    this.deuda.metodoPago = false;

    
  }
  resetErrors(){
    Object.keys(this.errores).forEach(key=>{
      this.errores[key] = ["",false];
    })
  }


  addEvent(event: MatDatepickerInputEvent<Date>){
    this.cliente.fechaEmision = event.value.toISOString();
    let deudaDate = event.value;
    
    deudaDate.setMonth(deudaDate.getMonth()+1);
    this.deuda.fecha =deudaDate.toISOString();
   
    
  }
  checkForm():{}{
    let errors = {}
    if(this.cliente.perfil.nombre === "" || this.cliente.perfil.nombre === null){
      
      errors["nombre"] = ["Nombre no puede estar vacio.", true] 
    }
    if(this.cliente.perfil.apellidoP == ""){
      errors["aPaterno"] = ["Apellido paterno no puede estar vacio.", true] 
    }
    if(this.cliente.perfil.apellidoM == "" ){
      errors["aMaterno"] = ["Apellido materno no puede estar vacio.", true] 
    }
    if( this.cliente.perfil.correo == ""){
      errors["correo"] = ["Correo no puede estar vacio.", true]
    }
    if(this.cliente.perfil.direccion == ""){
      errors["direccion"] = ["Direccion no puede estar vacio.", true]
    }
    if(this.cliente.perfil.dni === null) {
      errors["dni"] = ["DNI no puede estar vacio.", true]
    }else
    if(this.cliente.perfil.dni < 9999999){
      errors["dni"] = ["DNI es menor de 8 digitos.", true]
    }
    if(this.cliente.perfil.telefono === null){
      errors["telefono"] = ["Telefono no puede estar vacio.", true]
    } else if(this.cliente.perfil.telefono < 99999999){
      errors["telefono"] = ["Telefono es menor de 9 digitos.", true]
    } 
    if(this.cliente.moneda == "") {
      errors["moneda"] = ["Moneda no puede estar vacio.", true]
    }
    console.log(this.cliente.credito);
    if( this.cliente.credito === "" || this.cliente.credito === null){
      errors["credito"] = ["Credito no puede estar vacio.", true]
    } else
    if(  parseFloat(this.cliente.credito) === 0.0 ){
      errors["credito"] = ["Credito no puede ser 0.", true]
    } 
    if(this.cliente.fechaEmision == ""){
      errors["fecha"] = ["Fecha de emision no puede estar vacio.", true]
    } 
  

    
    return errors;
  }
  
  isNumberKey(evt){
    console.log(evt.keyCode);
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
      && (charCode < 48 || charCode > 57))
        return false;

    return true;
 }
  goToTasa(){
    this.loading = true;
    this.resetErrors();
    let errs = this.checkForm()
    if(Object.keys(errs).length === 0){
 this.cliente.negocio_id = this.appComponent.info.id;
    this.cliente.deudas.push(this.deuda);

    console.log(this.cliente);
    this.clienteService.saveCliente(this.cliente);
    
      
    this.router.navigate(['registrar-cliente-tasa']);

    }else{
      
      Object.keys(errs).forEach(key=>{
        this.errores[key] = errs[key];
      })
      this.loading = false;
    }
   
  
  }

}

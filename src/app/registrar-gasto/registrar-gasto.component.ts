import { Component, OnInit } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente';
import { Deuda } from '../models/Deuda';
import { Gasto } from '../models/Gasto';
import { ClienteService } from '../services/cliente.service';
import { GastoService } from '../services/gasto.service';
interface Moneda {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-registrar-gasto',
  templateUrl: './registrar-gasto.component.html',
  styleUrls: ['./registrar-gasto.component.css']
})
export class RegistrarGastoComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource = [];
  cliente:Cliente;
  gastos=[];
  gasto = new Gasto();
  deuda : Deuda;
  valid = true;
  error = "";
  constructor(private router:Router,private clienteService :ClienteService,private gastoService:GastoService) { }

  foods: Moneda[] = [
    {value: 'soles', viewValue: 'Soles'},
    {value: 'dolares', viewValue: 'Dolar'}
  ];
  ngOnInit(): void {
    
    
    this.clienteService.share.subscribe(data=>{ 
      this.cliente = data;
      this.deuda = this.cliente.deudas[this.cliente.deudas.length-1];
      this.dataSource = this.deuda.gastos;
      this.gastos= this.deuda.gastos;
      this.displayedColumns = ['id', 'fecha', 'valor'];
      });

  }
  addEvent(event: MatDatepickerInput<Date>){
    this.gasto.fecha = event.value.toISOString();

  }


  registrarGasto(){
    if(this.gasto.monto >0 && this.gasto.envioMonto >0){
       this.gasto.deuda_id = this.deuda.id;
    this.gastoService.postGasto(this.gasto).subscribe(data=>{
      console.log(data);
      this.router.navigate(['clientes']);
    })
    }else{
      this.valid = false;
      if (this.gasto.monto <=0){
        this.error = "Monto de gasto debe ser mayor a 0.";
      }else 
      if(this.gasto.envioMonto <=0){
        this.error = "Monto de envio debe ser mayor a 0.";
      }
      
    }
   
  }
}

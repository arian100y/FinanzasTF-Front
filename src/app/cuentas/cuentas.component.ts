import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Deuda } from '../models/Deuda';
import { ClienteService } from '../services/cliente.service';


@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource = [];
  public clientes =[];
 
  constructor(private clienteService: ClienteService,private router:Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data=>{
      this.clientes = data;
      
      this.dataSource = data;
      
      this.displayedColumns = ['id', 'perfil.nombre', 'tasa', 'deudaMonto','actions'];
    })

  }

  goToGastos(row){    
    
    this.clienteService.saveCliente(row);
    this.router.navigate(['gastos-cobros-negocio']);
  }

}

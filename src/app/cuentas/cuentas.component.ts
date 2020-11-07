import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Deuda } from '../models/Deuda';
import { NegocioService } from '../services/negocio.service';
import { ClienteService } from '../services/cliente.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource = [];
  public clientes =[];
 
  constructor(private negocioService: NegocioService,private clienteService: ClienteService,private router:Router,private appComponent:AppComponent) { }

  ngOnInit(): void {

    this.negocioService.getNegociobyPerfil_id(this.appComponent.info.id).subscribe(data=>{
      this.clientes = data.clientes;
      this.dataSource = data.clientes;
      this.displayedColumns = ['id', 'perfil.nombre', 'tasa', 'deudaMonto','actions'];
    })
  }

  goToGastos(row){    
    
    this.clienteService.saveCliente(row);
    this.router.navigate(['gastos-cobros-negocio']);
  }

}

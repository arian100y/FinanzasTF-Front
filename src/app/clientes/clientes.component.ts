import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource = [];
  public clientes =[];
  constructor(private clienteService :ClienteService,private router:Router,private appComponent:AppComponent) {
    if(this.appComponent.loggedInNegocio === false){
      this.router.navigate(['']);
    }
   }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data=>{
      this.clientes = data;
      
      this.dataSource = data;
      this.displayedColumns = ['id', 'perfil.nombre', 'perfil.dni', 'perfil.direccion','perfil.correo'];
    })

  }

}

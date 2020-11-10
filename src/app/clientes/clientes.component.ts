import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';
import { NegocioService } from '../services/negocio.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] ;
  dataSource = [];
  public clientes =[];
  constructor(private clienteService :ClienteService,private negocioService :NegocioService,private router:Router,private appComponent:AppComponent) {
    if(this.appComponent.loggedInNegocio === false){
      this.router.navigate(['']);
    }
   }
   loading = false;
  ngOnInit(): void {
<<<<<<< HEAD
    this.negocioService.getNegociobyPerfil_id(this.appComponent.info.id).subscribe(data=>{
      this.clientes = data.clientes;
      this.dataSource = data.clientes;
=======
    this.clienteService.getClientes().subscribe(data=>{
      this.clientes = data;
      this.loading = true;
      this.dataSource = data;
>>>>>>> main
      this.displayedColumns = ['id', 'perfil.nombre', 'perfil.dni', 'perfil.direccion','perfil.correo'];
    })
  }
}

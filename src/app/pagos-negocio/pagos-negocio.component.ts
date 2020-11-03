import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-pagos-negocio',
  templateUrl: './pagos-negocio.component.html',
  styleUrls: ['./pagos-negocio.component.css']
})
export class PagosNegocioComponent implements OnInit {
 dataSource = [];
clientes = [];
displayedColumns :String[];
  constructor(private clienteService:ClienteService, ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data=>{
    this.clientes = data;
    
    this.dataSource = data;
    
    this.displayedColumns = ['id', 'nombre', 'dni', 'monto','estado'];
  })
  }

  getEstado(estado){
    if(estado === false){
      return "No pagado."
    }else{
      return "Pagado."
    }
  }

}

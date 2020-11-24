import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  tipoTasa = ['Tasa simple', 'Tasa nominal', 'Tasa efectiva'];
  tipoTasaAbreviacion = ['S', 'N', 'E'];
  tipoPeriodo = ['D', 'S', 'Q', 'M', 'B', 'T', 'C', 'S', 'A'];
  periodosMantenimiento = ['semanal', 'quincenal', 'mensual'];

  public cliente = new Cliente();
  constructor(private appComponent: AppComponent, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientebyPerfil_id(this.appComponent.info.perfil.id).subscribe(data => {
      this.cliente = data;
      console.log(this.cliente)
    })
  }
  soles(row) {
    if (row.tasa.moneda == 1) {
      return '$'
    } else {
      return 'S/'
    }
  }
}

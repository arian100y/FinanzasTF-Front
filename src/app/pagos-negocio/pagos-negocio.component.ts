import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ClienteService } from '../services/cliente.service';
import { NegocioService } from '../services/negocio.service';

@Component({
  selector: 'app-pagos-negocio',
  templateUrl: './pagos-negocio.component.html',
  styleUrls: ['./pagos-negocio.component.css'],
})
export class PagosNegocioComponent implements OnInit {
  dataSource = [];
  clientes = [];
  displayedColumns: String[];
  constructor(
    private negocioService: NegocioService,
    private appComponent: AppComponent
  ) {}
  loading = false;
  ngOnInit(): void {
    this.negocioService
      .getNegociobyPerfil_id(this.appComponent.info.id)
      .subscribe((data) => {
        this.clientes = data.clientes;
        this.dataSource = data.clientes;
        this.loading = true;
        this.displayedColumns = ['id', 'nombre', 'dni', 'monto', 'estado'];
      });
  }

  getEstado(estado) {
    if (estado === false) {
      return 'No pagado.';
    } else {
      return 'Pagado.';
    }
  }
}

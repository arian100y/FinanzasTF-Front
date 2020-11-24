import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';
import { NegocioService } from '../services/negocio.service';

@Component({
  selector: 'app-pagos-negocio',
  templateUrl: './pagos-negocio.component.html',
  styleUrls: ['./pagos-negocio.component.css'],
})
export class PagosNegocioComponent implements OnInit {
  dataSource: MatTableDataSource<Cliente>;
  clientes = [];
  displayedColumns: String[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private negocioService: NegocioService,
    private appComponent: AppComponent
  ) {}
  loading = false;
  ngOnInit(): void {
    this.negocioService
      .getNegociobyPerfil_id(this.appComponent.id)
      .subscribe((data) => {
        this.clientes = data.clientes;
        this.dataSource = new MatTableDataSource<Cliente>(data.clientes);
        this.loading = true;
        this.displayedColumns = [
          'nombre',
          'dni',
          'monto',
          'estado',
          'montoMora',
        ];
        this.dataSource.paginator = this.paginator;
      });
  }
  soles(row) {
    let deudas = row.deudas;
    deudas.sort((a, b) => b.id - a.id);
    let ded = deudas[0];
    if (row.tasa.moneda == 1) {
      return '$ ' + ded.monto;
    } else {
      return 'S/' + ded.monto;
    }
  }

  solesMora(row) {
    if (row.tasa.moneda == 1) {
      return '$ ' + row.montoMora;
    } else {
      return 'S/' + row.montoMora;
    }
  }
  getLastDeuda(cliente) {
    let deudas = cliente.deudas;
    deudas.sort((a, b) => b.id - a.id);
    return deudas[0];
  }
  getEstado(estado) {
    if (estado === false) {
      return 'No pagado.';
    } else {
      return 'Pagado.';
    }
  }
}

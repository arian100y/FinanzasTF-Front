import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Deuda } from '../models/Deuda';
import { NegocioService } from '../services/negocio.service';
import { ClienteService } from '../services/cliente.service';
import { AppComponent } from '../app.component';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../models/Cliente';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
})
export class CuentasComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Cliente>;
  loading = false;
  public clientes = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private negocioService: NegocioService,
    private clienteService: ClienteService,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.negocioService
      .getNegociobyPerfil_id(this.appComponent.id)
      .subscribe((data) => {
        this.clientes = data.clientes;
        this.dataSource = new MatTableDataSource<Cliente>(data.clientes);
        this.loading = true;
        this.displayedColumns = [
          'id',
          'perfil.nombre',
          'tasa',
          'credito',
          'deudaMonto',
          'moneda',
          'actions',
          'cuentas',
        ];
        this.dataSource.paginator = this.paginator;
      });
  }

  openModal(row) {
    this.selectedCliente = row;

    document.getElementById('myModal').style.display = 'block';
  }
  closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }
  selectedCliente = new Cliente();
  moneda(row) {
    if (row.tasa.moneda == 1) {
      return 'Dolares';
    } else {
      return 'Soles';
    }
  }
  soles(row) {
    if (row.tasa.moneda == 1) {
      return '$ ' + row.deudas[row.deudas.length - 1].monto;
    } else {
      return 'S/' + row.deudas[row.deudas.length - 1].monto;
    }
  }
  goToDeudas(row) {
    this.clienteService.saveCliente(row);
    this.router.navigate(['deudas']);
    //this.router.navigate(['gastos-cobros-negocio']);
  }

  guardarCambios() {}
}

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
  ) {
    this.resetErrors();
  }

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

    this.credito = this.selectedCliente.credito;

    this.tasaMonto = Object.assign(
      this.selectedCliente.tasa.monto,
      this.selectedCliente.tasa.monto
    );

    this.resetErrors();
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
  errores = {
    credito: null,
    montoTasa: null,
  };
  resetErrors() {
    Object.keys(this.errores).forEach((key) => {
      this.errores[key] = ['', false];
    });
  }
  credito = '';
  tasaMonto = 0;
  checkForm(): {} {
    let errors = {};

    if (this.credito === null) {
      this.credito = this.selectedCliente.credito;
    } else if (
      parseFloat(this.credito) < parseFloat(this.selectedCliente.credito)
    ) {
      errors['credito'] = [
        'Credito no puede ser menor al credito actual.',
        true,
      ];
    } else if (
      this.credito == '0' ||
      this.credito == '0.0' ||
      this.credito == '0.00'
    ) {
      errors['credito'] = ['Credito no puede ser 0.', true];
    }

    if (this.tasaMonto === null) {
      this.tasaMonto = this.selectedCliente.tasa.monto;
    } else if (this.tasaMonto == 0) {
      errors['montoTasa'] = ['Monto de tasa no puede ser 0.', true];
    }

    return errors;
  }
  isNumberKey(evt) {
    console.log(evt.keyCode);
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  guardarCambios() {
    this.resetErrors();
    let errs = this.checkForm();
    if (Object.keys(errs).length === 0) {
      this.selectedCliente.credito = this.credito;
      this.selectedCliente.tasa.monto = this.tasaMonto;
      this.clienteService
        .editCliente(this.selectedCliente)
        .subscribe((data) => {
          console.log();
          this.closeModal();
        });
    } else {
      Object.keys(errs).forEach((key) => {
        this.errores[key] = errs[key];
      });
    }
  }
}

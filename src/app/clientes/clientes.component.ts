import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';
import { NegocioService } from '../services/negocio.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Cliente>;
  loading = false;
  public clientes = [];
  constructor(
    private clienteService: ClienteService,
    private negocioService: NegocioService,
    private router: Router,
    private appComponent: AppComponent,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    if (this.appComponent.loggedInNegocio === false) {
      this.router.navigate(['']);
    }
    this.resetErrors();
  }
  selectedCliente = new Cliente();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  delete(row) {
    console.log(this.dataSource.data.length);
    let index = this.dataSource.data.indexOf(row);
    this.dataSource.data.splice(index, 1);
    this.changeDetectorRefs.detectChanges();
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    console.log(this.dataSource.data.length);
    this.clienteService.deleteCliente(row.id).subscribe((data) => {
      console.log(data);
    });
  }
  ngOnInit(): void {
    this.negocioService
      .getNegociobyPerfil_id(this.appComponent.id)
      .subscribe((data) => {
        console.log(data);
        this.clientes = data.clientes;
        this.dataSource = new MatTableDataSource<Cliente>(data.clientes);
        this.loading = true;
        this.displayedColumns = [
          'id',
          'perfil.nombre',
          'perfil.dni',
          'perfil.direccion',
          'perfil.correo',
          'actions',
          'cuentas',
        ];
        this.dataSource.paginator = this.paginator;
      });
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

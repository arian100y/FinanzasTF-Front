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
    nombre: null,
    correo: null,
    direccion: null,
  };
  resetErrors() {
    Object.keys(this.errores).forEach((key) => {
      this.errores[key] = ['', false];
    });
  }
  openModal(row) {
    this.selectedCliente = row;

    this.nombre = this.selectedCliente.perfil.nombre;
    this.correo = this.selectedCliente.perfil.correo;
    this.direccion = this.selectedCliente.perfil.direccion;

    this.resetErrors();
    document.getElementById('myModal').style.display = 'block';
  }
  closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }
  nombre = null;
  direccion = null;
  correo = null;
  checkForm(): {} {
    let errors = {};

    if (this.nombre === null) {
      this.nombre = this.selectedCliente.perfil.nombre;
    } else if (this.nombre == '') {
      errors['nombre'] = ['Nombre no puede estar vacio.', true];
    }

    if (this.correo === null) {
      this.correo = this.selectedCliente.perfil.correo;
    } else if (this.correo == '') {
      errors['correo'] = ['Correo no puede estar vacio.', true];
    }
    if (this.direccion === null) {
      this.direccion = this.selectedCliente.perfil.direccion;
    } else if (this.direccion == '') {
      errors['direccion'] = ['Direccion no puede estar vacio.', true];
    }

    return errors;
  }
  guardarCambios() {
    this.resetErrors();
    let errs = this.checkForm();
    if (Object.keys(errs).length === 0) {
      this.selectedCliente.perfil.nombre = this.nombre;
      this.selectedCliente.perfil.correo = this.correo;
      this.selectedCliente.perfil.direccion = this.direccion;

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

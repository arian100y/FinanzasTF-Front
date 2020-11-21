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
  }
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
        ];
        this.dataSource.paginator = this.paginator;
      });
  }
}

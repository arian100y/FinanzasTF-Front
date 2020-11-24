import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gasto } from '../models/Gasto';
import { AppComponent } from '../app.component';
import { GastoService } from '../services/gasto.service';
import { DeudaService } from '../services/deuda.service';
import { CookieService } from 'ngx-cookie-service';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/Cliente';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css'],
})
export class GastoComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'descripcion',
    'monto',
    'fecha',
    'envioMonto',
  ];
  cliente: Cliente
  dataSource: MatTableDataSource<Gasto>;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private deudaService: DeudaService,
    private appComponent: AppComponent,
    private clienteService: ClienteService,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;\

    this.clienteService.share.subscribe((x) => {
      this.cliente = x;
    })

    let data;
    if (this.cookie.get('lastGastos')) {
      data = JSON.parse(this.cookie.get('lastGastos'));
    } else {
      data = this.deudaService.getDeuda();
    }
    
    

    console.log(data.gastos);

    this.dataSource = new MatTableDataSource<Gasto>(data.gastos);
    this.loading = true;
    this.dataSource.paginator = this.paginator;

    
  }

  soles(row) {
    if (row.tasa.moneda == 1) {
      return '$'
    } else {
      return 'S/'
    }
  }
}


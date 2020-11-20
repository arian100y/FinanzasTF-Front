import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Cliente } from '../models/Cliente';
import { GastoService } from '../services/gasto.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ClienteService } from '../services/cliente.service';
import { DeudaService } from '../services/deuda.service';
import { Deuda } from '../models/Deuda';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [DatePipe],
})
export class PagoComponent implements OnInit {
  dataSource: MatTableDataSource<Deuda>;
  displayedColumns = [];
  date: Date;
  dateString: String;
  info: string;
  cliente: Cliente;
  loading = false;

  tipoTasa = ['Tasa simple', 'Tasa nominal', 'Tasa efectiva'];
  tipoTasaAbreviacion = ['S', 'N', 'E'];
  tipoPeriodo = ['D', 'M', 'B', 'A'];
  tipo = '';
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private cookies: CookieService,
    private deudaService: DeudaService,
    private clienteService: ClienteService,
    private appComponent: AppComponent
  ) {}
  deudas = [];
  deuda: Deuda;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.date = new Date();
    this.dateString = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.cliente = this.appComponent.info;

    this.clienteService
      .getClientebyPerfil_id(this.appComponent.info.perfil.id)
      .subscribe((data) => {
        this.cliente = data;
        this.deudas = this.cliente.deudas;
        this.deudas.sort((b, a) => a.id - b.id);
        this.deuda = this.deudas[0];
        this.dataSource = new MatTableDataSource<Deuda>(this.cliente.deudas);
        this.displayedColumns = ['id', 'fecha', 'valor'];
        this.tipo = this.tipoTasa[this.cliente.tasa.tipo];
        this.dataSource.paginator = this.paginator;
      });
  }

  goToGastos(element) {
    console.log('el', element);
    this.deudaService.saveDeuda(element);
    this.cookies.set('lastGastos', JSON.stringify(element));
    this.router.navigate(['gastos-actuales']);
  }
}

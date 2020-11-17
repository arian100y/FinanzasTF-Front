import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente';
import { Deuda } from '../models/Deuda';
import { ClienteService } from '../services/cliente.service';
import { DeudaService } from '../services/deuda.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-gastos-cobros-negocio',
  templateUrl: './gastos-cobros-negocio.component.html',
  styleUrls: ['./gastos-cobros-negocio.component.css'],
  providers: [DatePipe],
})
export class GastosCobrosNegocioComponent implements OnInit {
  displayedColumns: string[];
  dataSource = [];
  date: Date;
  dateString: String;
  info: string;
  cliente: Cliente;
  private gastos = [];
  loading = false;
  tipoTasa = ['Tasa simple', 'Tasa nominal', 'Tasa efectiva'];
  tipoTasaAbreviacion = ['S', 'N', 'E'];
  tipoPeriodo = ['D', 'M', 'B', 'A'];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private clienteService: ClienteService,
    private deudaService: DeudaService
  ) {}
  deuda: Deuda;
  ngOnInit(): void {
    this.date = new Date();
    this.info = 'blach blah  test';
    this.dateString = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    this.clienteService.ded.subscribe((data) => {
      this.deuda = data;

      //deudas.sort((a, b) => a.id - b.id);

      //this.gastos = deudas[0].gastos;
      this.dataSource = this.deuda.gastos;
      this.displayedColumns = ['id', 'fecha', 'valor'];
    });
    this.clienteService.share.subscribe((data) => {
      this.cliente = data;
    });
  }

  marcarPagado() {
    this.deuda.pagado = true;
    this.deudaService.registrar(this.deuda).subscribe((data) => {
      console.log(data);
      this.myFunction();
    });
  }
  myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
  goToRegistrarGasto() {
    this.router.navigate(['registrar-gasto-negocio']);
  }
}

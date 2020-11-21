import { CdkRowDef } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente';
import { Deuda } from '../models/Deuda';
import { ClienteService } from '../services/cliente.service';
import { DeudaService } from '../services/deuda.service';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['./deudas.component.css'],
})
export class DeudasComponent implements OnInit {
  dataSource = [];
  cliente: Cliente;
  deudas = [];
  displayedColumns: String[];
  date: Date;
  dateString: String;
  deuda: Deuda;

  tipoTasa = ['Tasa simple', 'Tasa nominal', 'Tasa efectiva'];
  tipoTasaAbreviacion = ['S', 'N', 'E'];
  tipoPeriodo = ['D', 'M', 'B', 'A'];
  tipo = '';

  constructor(
    private deudaService: DeudaService,
    private clienteService: ClienteService,
    private router: Router
  ) {}
  loading = false;
  deudasReales = [];

  ngOnInit(): void {
    this.date = new Date();
    //this.dateString = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    this.clienteService.share.subscribe((data) => {
      this.cliente = data;
      let deudas = this.cliente.deudas;
      deudas.sort((a, b) => b.id - a.id);
      this.deudas = deudas;
      this.deudasReales = deudas;
      this.tipo = this.tipoTasa[this.cliente.tasa.tipo];
      this.deuda = deudas[0];

      for (let i = 0; i < this.dataSource.length; i++) {
        const date = this.dataSource[i].fecha;

        let fech = new Date(date);

        this.dataSource[i].fecha = `${fech.getDay()}/${
          fech.getMonth() + 1
        }/${fech.getFullYear()}`;
      }
      this.dataSource = this.deudas;
      this.displayedColumns = [
        'monto',
        'interes',
        'pagado',
        'fecha',
        'actions',
        'verGastos',
      ];
      if (this.deuda.pagado === true) {
        document.getElementById('buttonPaid').classList.toggle('disabled');
      }
      this.loading = true;
    });
  }
  findDeuda(id) {
    for (let i = 0; i < this.deudas.length; i++) {
      const element = this.deudas[i];

      if (element.id === id) {
        return i;
      }
    }
  }
  marcarPagado() {
    let index = this.dataSource.indexOf(this.deuda);
    this.dataSource.splice(index, 1);

    this.dataSource = new MatTableDataSource(this.dataSource).data;

    this.deuda.pagado = true;
    console.log(this.deuda);
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

  changeDeuda(row) {
    this.deuda = row;
    if (document.getElementById('buttonPaid').classList.contains('disabled')) {
      document.getElementById('buttonPaid').classList.toggle('disabled');
    }
    if (row.pagado === true) {
      document.getElementById('buttonPaid').classList.toggle('disabled');
    }
  }
  soles(row) {
    if (row.tasa.moneda == 1) {
      return '$ ' + row.deudas[row.deudas.length - 1].monto;
    } else {
      return 'S/' + row.deudas[row.deudas.length - 1].monto;
    }
  }
  getFecha() {
    return this.deuda.fecha.split('T')[0];
  }
  getFecha2(row) {
    return row.split('T')[0];
  }
  estado() {
    if (parseFloat(this.cliente.credito) < 0) {
      if (
        document.getElementById('state').classList.contains('red') === false
      ) {
        document.getElementById('state').classList.toggle('red');
      }

      return 'El cliente ha sobrepasado el limite de credito. ';
    } else {
      if (
        document.getElementById('state').classList.contains('green') === false
      ) {
        document.getElementById('state').classList.toggle('green');
      }
      return 'El cliente no sobrepasa el limite de credito.';
    }
  }
  getEstado(estado) {
    if (estado === false) {
      return 'No pagado.';
    } else {
      return 'Pagado.';
    }
  }
  goToGastos(row) {
    this.clienteService.saveDeuda(row);
    this.router.navigate(['gastos-cobros-negocio']);
  }
}

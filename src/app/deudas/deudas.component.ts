import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente';
import { Deuda } from '../models/Deuda';
import { ClienteService } from '../services/cliente.service';

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

  constructor(private clienteService: ClienteService, private router: Router) { }
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
      
      console.log("this.deuda")
      console.log(this.deuda)
      

      for (let i = 0; i < this.dataSource.length; i++) {
        const date = this.dataSource[i].fecha;

        let fech = new Date(date);

        this.dataSource[i].fecha = `${fech.getDay()}/${fech.getMonth() + 1
          }/${fech.getFullYear()}`;
      }
      this.dataSource = this.deudas;
      this.displayedColumns = [
        'id',
        'monto',
        'interes',
        'pagado',
        'fecha',
        'actions',
      ];
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
  goToGastos(row) {
    this.clienteService.saveDeuda(this.deudasReales[this.findDeuda(row.id)]);
    this.router.navigate(['gastos-cobros-negocio']);
  }
}

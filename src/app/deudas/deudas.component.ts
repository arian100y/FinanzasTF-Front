import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente';
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
  constructor(private clienteService: ClienteService, private router: Router) {}
  loading = false;
  ngOnInit(): void {
    this.displayedColumns = [
      'id',
      'monto',
      'interes',
      'pagado',
      'fecha',
      'actions',
    ];
    this.clienteService.share.subscribe((data) => {
      this.cliente = data;
      let deudas = this.cliente.deudas;
      deudas.sort((a, b) => b.id - a.id);
      this.deudas = deudas;

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

  goToGastos(row) {
    this.clienteService.saveDeuda(row);
    this.router.navigate(['gastos-cobros-negocio']);
  }
}

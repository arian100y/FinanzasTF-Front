import { Component, OnInit } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente';
import { Deuda } from '../models/Deuda';
import { Gasto } from '../models/Gasto';
import { ClienteService } from '../services/cliente.service';
import { GastoService } from '../services/gasto.service';
interface Moneda {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-registrar-gasto',
  templateUrl: './registrar-gasto.component.html',
  styleUrls: ['./registrar-gasto.component.css'],
})
export class RegistrarGastoComponent implements OnInit {
  displayedColumns: string[];
  dataSource = [];
  cliente: Cliente;
  gastos = [];
  gasto = new Gasto();
  deuda: Deuda;
  valid = true;
  error = '';
  loading = false;
  todayDate: Date = new Date();
  errores = {
    descripcion: null,
    monto: null,
    envioMonto: null,
    fecha: null,
  };
  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private gastoService: GastoService
  ) {}

  foods: Moneda[] = [
    { value: 'soles', viewValue: 'Soles' },
    { value: 'dolares', viewValue: 'Dolar' },
  ];
  ngOnInit(): void {
    this.clienteService.share.subscribe((data) => {
      this.cliente = data;
      let deudas = this.cliente.deudas;
      deudas.sort((a, b) => a.id - b.id);

      this.gastos = deudas[0].gastos;
      this.dataSource = this.gastos;
      this.displayedColumns = ['id', 'fecha', 'valor'];
    });
    this.resetErrors();
  }
  addEvent(event: MatDatepickerInput<Date>) {
    this.gasto.fecha = event.value.toISOString();
    console.log(this.gasto.fecha);
  }
  resetErrors() {
    Object.keys(this.errores).forEach((key) => {
      this.errores[key] = ['', false];
    });
  }

  isNumberKey(evt) {
    console.log(evt.keyCode);
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }

  checkForm(): {} {
    let errors = {};
    console.log('LMFAO');
    if (this.gasto.descripcion === '') {
      errors['descripcion'] = ['Descripcion no puede estar vacio.', true];
    }

    //CARGO DE ENVIO / MONTO
    if (this.gasto.monto === null) {
      errors['monto'] = ['Monto no puede estar vacio.', true];
    } else if (this.gasto.monto === 0.0) {
      errors['monto'] = ['Monto no puede ser 0.', true];
    }

    if (this.gasto.envioMonto === null) {
      errors['envioMonto'] = ['Monto de envio no puede estar vacio.', true];
    } else if (this.gasto.envioMonto === 0.0) {
      errors['envioMonto'] = ['Monto de envio no puede ser 0.', true];
    }

    if (this.gasto.fecha == '') {
      errors['fecha'] = ['Fecha de emision no puede estar vacio.', true];
    }

    return errors;
  }
  registrarGasto() {
    console.log('FSAFS');
    this.loading = true;
    this.resetErrors();
    let errs = this.checkForm();
    if (Object.keys(errs).length === 0) {
      this.gasto.deuda_id = this.deuda.id;
      this.gastoService.postGasto(this.gasto).subscribe((data) => {
        console.log(data);
        this.router.navigate(['clientes']);
      });
    } else {
      this.loading = false;
      this.valid = false;
      Object.keys(errs).forEach((key) => {
        this.errores[key] = errs[key];
      });
    }
  }
}

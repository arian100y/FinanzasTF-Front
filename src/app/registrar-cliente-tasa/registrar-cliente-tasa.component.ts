import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../models/Cliente';
import { Tasa } from '../models/Tasa';
import { RegistrarClienteComponent } from '../registrar-cliente/registrar-cliente.component';
import { ClienteService } from '../services/cliente.service';
interface Tasas {
  value: number;
  viewValue: string;
}
interface Tiempos {
  value: number;
  viewValue: string;
}

interface Tiempos2 {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-registrar-cliente-tasa',
  templateUrl: './registrar-cliente-tasa.component.html',
  styleUrls: ['./registrar-cliente-tasa.component.css'],
})
export class RegistrarClienteTasaComponent implements OnInit {
  tasa: Tasa;
  client: Cliente;

  errores = {
    monto: null,
    tipo: null,
    periodo: null,
  };
  loading = false;
  constructor(private clienteService: ClienteService, private router: Router) {
    this.resetErrors();
  }
  foods: Tasas[] = [
    { value: 0, viewValue: 'Tasa Simple' },
    { value: 1, viewValue: 'Tasa Nominal' },
    { value: 2, viewValue: 'Tasa Efectiva' },
  ];
  foods2: Tiempos[] = [
    { value: 0, viewValue: 'Diaria' },
    { value: 1, viewValue: 'Semanal' },
    { value: 2, viewValue: 'Quincenal' },
    { value: 3, viewValue: 'Mensual' },
    { value: 4, viewValue: 'Bimestral' },
    { value: 5, viewValue: 'Trimestral' },
    { value: 6, viewValue: 'Cuatrimestral' },
    { value: 7, viewValue: 'Semestral' },
    { value: 8, viewValue: 'Anual' },
  ];
  foods3: Tiempos2[] = [
    { value: 0, viewValue: 'Diaria' },
    { value: 1, viewValue: 'Semanal' },
    { value: 2, viewValue: 'Quincenal' },
    { value: 3, viewValue: 'Mensual' },
    { value: 4, viewValue: 'Bimestral' },
    { value: 5, viewValue: 'Trimestral' },
    { value: 6, viewValue: 'Cuatrimestral' },
    { value: 7, viewValue: 'Semestral' },
    { value: 8, viewValue: 'Anual' },
  ];
  ngOnInit(): void {
    this.tasa = new Tasa();

    this.clienteService.share.subscribe((data) => {
      this.client = data;
    });
    console.log(this.client.perfil.nombre);
  }
  resetErrors() {
    Object.keys(this.errores).forEach((key) => {
      this.errores[key] = ['', false];
    });
  }

  checkForm(): {} {
    let errors = {};

    if (this.tasa.monto === null) {
      errors['monto'] = ['Monto de tasa no puede estar vacio.', true];
    } else if (this.tasa.monto === 0) {
      errors['monto'] = ['Monto de tasa no puede ser 0.', true];
    } else if (this.tasa.monto > 1) {
      errors['monto'] = ['Monto de tasa tiene que ser en decimal.', true];
    }

    if (this.tasa.periodo === null) {
      errors['periodo'] = ['Periodo no puede estar vacio.', true];
    }

    if (this.tasa.periodoCapitalizacion === null) {
      errors['periodoCapitalizacion'] = ['Periodo no puede estar vacio.', true];
    }

    if (this.tasa.tipo === null) {
      errors['tipo'] = ['Tipo no puede estar vacio.', true];
    }

    return errors;
  }

  somethingChanged(event) {
    console.log('fadsf');
    if (this.tasa.tipo == 1) {
      this.hide1 = false;
      this.hide2 = false;
    } else if (this.tasa.tipo == 2) {
      this.hide1 = false;
      this.hide2 = true;
    } else {
      this.hide1 = true;
      this.hide2 = true;
    }
  }
  hide1 = true;
  hide2 = true;
  isNumberKey(evt) {
    console.log(evt.keyCode);
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  registerCliente() {
    //let client = this.regClienteComponent.cliente;
    this.loading = true;
    let errs = this.checkForm();
    if (Object.keys(errs).length === 0) {
      this.client.tasa = this.tasa;
      console.log(this.client);
      this.clienteService.registrar(this.client).subscribe(
        (data) => {
          this.router.navigate(['clientes']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.loading = false;
      Object.keys(errs).forEach((key) => {
        this.errores[key] = errs[key];
      });
    }
  }
}

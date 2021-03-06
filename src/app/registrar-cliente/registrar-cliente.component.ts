import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';
import { Deuda } from '../models/Deuda';
import { Negocio } from '../models/Negocio';
import { RegistrarClienteTasaComponent } from '../registrar-cliente-tasa/registrar-cliente-tasa.component';
import { ClienteService } from '../services/cliente.service';
import { NegocioService } from '../services/negocio.service';

interface Moneda {
  value: string;
  viewValue: string;
}

interface Tiempos {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
})
export class RegistrarClienteComponent implements OnInit {
  errores = {
    nombre: ['', false],
    aMaterno: null,
    aPaterno: null,
    dni: null,
    direccion: null,
    moneda: null,
    correo: null,
    telefono: null,
    credito: null,
    fecha: null,
    mantenimiento: null,
    periodoMantenimiento: null,
    mora: null,
  };

  foods: Moneda[] = [
    { value: 'soles', viewValue: 'Soles' },
    { value: 'dolares', viewValue: 'Dolar' },
  ];
  periodos: Tiempos[] = [
    { value: 0, viewValue: 'Semanal' },
    { value: 1, viewValue: 'Quincenal' },
    { value: 2, viewValue: 'Mensual' },
  ];

  todayDate: Date = new Date();
  deuda: Deuda;
  loading = false;
  public cliente: Cliente;

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private clienteService: ClienteService
  ) {
    this.cliente = new Cliente();
    this.deuda = new Deuda();

    Object.keys(this.errores).forEach((key) => {
      this.errores[key] = ['', false];
    });
  }

  ngOnInit(): void {
    this.deuda.interes = 0.0;
    this.deuda.monto = 0.0;
    this.deuda.montoMantenimiento = 0.0;
    this.deuda.pagado = false;
    this.deuda.metodoPago = false;
  }
  resetErrors() {
    Object.keys(this.errores).forEach((key) => {
      this.errores[key] = ['', false];
    });
  }

  somethingChanged(event) {
    if (this.cliente.mantenimiento > 0.0) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.cliente.fechaEmision = event.value.toISOString();
    let deudaDate = event.value;

    let date = new Date(deudaDate);

    date.setMonth(deudaDate.getMonth() + 1);
    this.deuda.fecha = date.toISOString();
  }
  checkForm(): {} {
    let errors = {};
    if (
      this.cliente.perfil.nombre === '' ||
      this.cliente.perfil.nombre === null
    ) {
      errors['nombre'] = ['Nombre no puede estar vacio.', true];
    }
    if (this.cliente.perfil.apellidoP == '') {
      errors['aPaterno'] = ['Apellido paterno no puede estar vacio.', true];
    }
    if (this.cliente.perfil.apellidoM == '') {
      errors['aMaterno'] = ['Apellido materno no puede estar vacio.', true];
    }
    if (this.cliente.perfil.correo == '') {
      errors['correo'] = ['Correo no puede estar vacio.', true];
    } else if (
      !this.cliente.perfil.correo.includes('@') ||
      !this.cliente.perfil.correo.includes('.') ||
      this.cliente.perfil.correo.includes(' ')
    ) {
      errors['correo'] = ['Ingrese un correo valido.', true];
    } else if (this.cliente.perfil.correo.split('@')[0] == '') {
      errors['correo'] = ['Ingrese un correo valido.', true];
    } else if (this.cliente.perfil.correo.split('.')[1] == '') {
      errors['correo'] = ['Ingrese un correo valido.', true];
    }
    if (this.cliente.perfil.direccion == '') {
      errors['direccion'] = ['Direccion no puede estar vacio.', true];
    }
    if (this.cliente.perfil.dni === null) {
      errors['dni'] = ['DNI no puede estar vacio.', true];
    } else if (this.cliente.perfil.dni < 9999999) {
      errors['dni'] = ['DNI es menor de 8 digitos.', true];
    }
    if (this.cliente.perfil.telefono === null) {
      errors['telefono'] = ['Telefono no puede estar vacio.', true];
    } else if (this.cliente.perfil.telefono < 99999999) {
      errors['telefono'] = ['Telefono es menor de 9 digitos.', true];
    }
    if (this.cliente.moneda == '') {
      errors['moneda'] = ['Moneda no puede estar vacio.', true];
    }

    if (this.cliente.credito === '' || this.cliente.credito === null) {
      errors['credito'] = ['Credito no puede estar vacio.', true];
    } else if (parseFloat(this.cliente.credito) === 0.0) {
      errors['credito'] = ['Credito no puede ser 0.', true];
    }
    if (this.cliente.mantenimiento == null) {
      errors['mantenimiento'] = [
        'Monto de mantenimiento no estar vacio.',
        true,
      ];
    } else if (this.cliente.mantenimiento > 1.0) {
      errors['mantenimiento'] = [
        'Monto de mantenimiento tiene que estar en decimal.',
        true,
      ];
    }
    if (this.cliente.fechaEmision == '') {
      errors['fecha'] = ['Fecha de emision no puede estar vacio.', true];
    }
    if (this.cliente.montoMora == null) {
      errors['mora'] = ['Monto de mora no estar vacio.', true];
    }
    return errors;
  }
  hide = true;
  isNumberKey(evt) {
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    console.log(this.cliente.mantenimiento);

    return true;
  }
  goToTasa() {
    this.loading = true;
    this.resetErrors();
    let errs = this.checkForm();
    this.cliente.negocio_id = this.appComponent.info.id;

    if (Object.keys(errs).length === 0) {
      if (this.cliente.montoMora > 0.0) {
        this.cliente.hayMora = true;
      }
      this.clienteService.verify(this.cliente).subscribe(
        (data) => {
          this.cliente.deudas.push(this.deuda);
          this.clienteService.saveCliente(this.cliente);

          this.router.navigate(['registrar-cliente-tasa']);
        },
        (err) => {
          this.loading = false;
          this.errores['dni'] = [err.error, true];
        }
      );
    } else {
      Object.keys(errs).forEach((key) => {
        this.errores[key] = errs[key];
      });
      this.loading = false;
    }
  }
}

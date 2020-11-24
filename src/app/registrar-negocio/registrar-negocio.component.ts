import { Component, OnInit } from '@angular/core';
import { Negocio } from '../models/Negocio';
import { NegocioService } from '../services/negocio.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styleUrls: ['./registrar-negocio.component.css'],
})
export class RegistrarNegocioComponent implements OnInit {
  loading = false;
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
    ruc: null,
    password: null,
    codigo: null,
  };
  negocioService: NegocioService;
  negocio: Negocio;

  constructor(
    private negoServ: NegocioService,
    private router: Router,
    private appComponent: AppComponent
  ) {
    this.negocioService = negoServ;
    this.negocio = new Negocio();
    this.resetErrors();
  }

  isNumberKey(evt) {
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  ngOnInit(): void {}
  resetErrors() {
    Object.keys(this.errores).forEach((key) => {
      this.errores[key] = ['', false];
    });
  }

  checkForm(): {} {
    let errors = {};
    if (
      this.negocio.perfil.nombre === '' ||
      this.negocio.perfil.nombre === null
    ) {
      errors['nombre'] = ['Nombre no puede estar vacio.', true];
    }
    if (this.negocio.perfil.apellidoP == '') {
      errors['aPaterno'] = ['Apellido paterno no puede estar vacio.', true];
    }
    if (this.negocio.perfil.apellidoM == '') {
      errors['aMaterno'] = ['Apellido materno no puede estar vacio.', true];
    }
    if (this.negocio.perfil.correo == '') {
      errors['correo'] = ['Correo no puede estar vacio.', true];
    } else if (
      !this.negocio.perfil.correo.includes('@') ||
      !this.negocio.perfil.correo.includes('.') ||
      this.negocio.perfil.correo.includes(' ')
    ) {
      errors['correo'] = ['Ingrese un correo valido.', true];
    } else if (this.negocio.perfil.correo.split('@')[0] == '') {
      errors['correo'] = ['Ingrese un correo valido.', true];
    } else if (this.negocio.perfil.correo.split('.')[1] == '') {
      errors['correo'] = ['Ingrese un correo valido.', true];
    }

    if (this.negocio.perfil.direccion == '') {
      errors['direccion'] = ['Direccion no puede estar vacio.', true];
    }
    if (this.negocio.perfil.dni === null) {
      errors['dni'] = ['DNI no puede estar vacio.', true];
    } else if (this.negocio.perfil.dni < 9999999) {
      errors['dni'] = ['DNI es menor de 8 digitos.', true];
    }
    if (this.negocio.perfil.telefono === null) {
      errors['telefono'] = ['Telefono no puede estar vacio.', true];
    } else if (this.negocio.perfil.telefono < 99999999) {
      errors['telefono'] = ['Telefono es menor de 9 digitos.', true];
    }
    if (this.negocio.ruc === null) {
      errors['ruc'] = ['RUC no puede estar vacio.', true];
    } else if (this.negocio.ruc < 9999999999) {
      errors['ruc'] = ['RUC es menor de 11 digitos.', true];
    }
    //to-do = ruc max limit

    if (this.negocio.password === '') {
      errors['password'] = ['Password no puede estar vacio.', true];
    }
    if (this.negocio.codigo === '') {
      errors['codigo'] = ['Codigo de negocio no puede estar vacio.', true];
    }

    return errors;
  }

  registerNegocio() {
    this.loading = true;
    this.resetErrors();
    let errs = this.checkForm();
    console.log(this.negocio.ruc);

    if (Object.keys(errs).length === 0) {
      console.log(this.negocio);
      this.negocioService.postNegocio(this.negocio).subscribe(
        (data) => {
          this.router.navigate(['negocio-login']);
        },
        (err) => {
          console.log(err.error);
          if (err.error == 'El RUC ya esta registrado.') {
            this.errores['ruc'] = [err.error, true];
          } else {
            this.errores['codigo'] = [err.error, true];
          }
          this.loading = false;
        }
      );
    } else {
      Object.keys(errs).forEach((key) => {
        this.errores[key] = errs[key];
        this.loading = false;
      });
    }
  }
}

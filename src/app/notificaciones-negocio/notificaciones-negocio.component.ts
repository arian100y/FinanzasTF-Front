import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Negocio } from '../models/Negocio';
@Component({
  selector: 'app-notificaciones-negocio',
  templateUrl: './notificaciones-negocio.component.html',
  styleUrls: ['./notificaciones-negocio.component.css']
})
export class NotificacionesComponent implements OnInit {
  dataSource = [];
  negocio:Negocio

  constructor(private router: Router, private appComponent: AppComponent) {
    if (this.appComponent.loggedInNegocio === false) {
      this.router.navigate(['']);
    }

  }

  ngOnInit(): void {
    
    this.negocio = this.appComponent.info
    console.log(this.negocio.clientes)
    this.dataSource = this.negocio.clientes

  }
}

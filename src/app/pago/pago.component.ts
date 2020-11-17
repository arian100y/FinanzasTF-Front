import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Cliente } from '../models/Cliente';
import { GastoService } from '../services/gasto.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ClienteService } from '../services/cliente.service';
import { DeudaService } from '../services/deuda.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [DatePipe]
})
export class PagoComponent implements OnInit {

  dataSource = [];
  displayedColumns = [];
  date: Date;
  dateString: String;
  info: string;
  cliente: Cliente;
  loading = false;

  tipoTasa = ['Tasa simple', 'Tasa nominal', 'Tasa efectiva']
  tipoTasaAbreviacion = ['S', 'N', 'E']
  tipoPeriodo = ['D', 'M', 'B', 'A']

  constructor(private router: Router, private datePipe: DatePipe, private cookies: CookieService, 
    private deudaService: DeudaService, private clienteService: ClienteService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.date = new Date();
    this.dateString = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.cliente=this.appComponent.info;

    this.clienteService.getClientebyPerfil_id(this.appComponent.info.perfil.id).subscribe(data => {
      console.log("why two",data.deudas[0].gastos);
      this.cliente = data;
      this.dataSource = this.cliente.deudas;
      this.displayedColumns = ['id', 'fecha', 'valor'];
      
    })
   
    

  }

  goToGastos(element) {
    console.log("el",element)
    this.deudaService.saveDeuda(element);
    this.cookies.set("lastGastos",JSON.stringify(element))
    this.router.navigate(['gastos-actuales'])
  }
}


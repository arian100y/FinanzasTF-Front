import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Cliente } from '../models/Cliente';
import { GastoService } from '../services/gasto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers:[DatePipe]
})
export class PagoComponent implements OnInit {

  dataSource =[];
 displayedColumns = [];
  date:Date;
  dateString:String;
  info : string;
  cliente:Cliente;
  constructor(private router:Router,private datePipe:DatePipe,private cookies:CookieService,private gastoService:GastoService) { }

  ngOnInit(): void {
    this.date = new Date();
    this.dateString = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.cliente = JSON.parse(this.cookies.get('cliente'));
    this.dataSource = this.cliente.deudas;
    this.displayedColumns = ['id', 'fecha', 'valor'];
    
  }

  goToGastos(element){
    this.gastoService.saveGasto(element.id);
    this.router.navigate(['gastos-actuales'])
  }
}

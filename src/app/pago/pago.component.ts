import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Cliente } from '../models/Cliente';
import { GastoService } from '../services/gasto.service';
import { Router } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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
  loading = false;
  constructor(private router:Router,private datePipe:DatePipe,private cookies:CookieService,private gastoService:GastoService) { }

  ngOnInit(): void {
    this.date = new Date();
    this.dateString = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.cliente = JSON.parse(this.cookies.get('cliente'));
    //HACER DINAMICO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.dataSource = this.cliente.deudas;
    this.displayedColumns = ['id', 'fecha', 'valor'];
    
  }

  goToGastos(element){
    this.gastoService.saveGasto(element.id);
    this.router.navigate(['gastos-actuales'])
  }
}

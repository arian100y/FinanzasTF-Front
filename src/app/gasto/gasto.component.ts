import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gasto } from '../models/Gasto';
import { AppComponent } from '../app.component';
import { GastoService } from '../services/gasto.service';
import { DeudaService } from '../services/deuda.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'descripcion', 'monto', 'fecha'];
  dataSource :MatTableDataSource<Gasto>;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private deudaService:DeudaService, private appComponent:AppComponent,private cookie:CookieService) { }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    //this.dataSource.paginator = this.paginator;\
    let data ;
    if(this.cookie.get("lastGastos")){
    data = JSON.parse(this.cookie.get('lastGastos'));
    }else{
      data  = this.deudaService.getDeuda()
    }
    
    console.log(data.gastos)
    
   
    this.dataSource =new MatTableDataSource<Gasto>(data.gastos);
    this.loading = true;
    
  }

}

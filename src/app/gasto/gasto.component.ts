import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gasto } from '../models/Gasto';
import { AppComponent } from '../app.component';
import { GastoService } from '../services/gasto.service';

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

  constructor(private gastoService:GastoService, private appComponent:AppComponent) { }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    //this.dataSource.paginator = this.paginator;
    this.gastoService.getAllGastosByUserId(this.appComponent.info.id).subscribe(data=>{
      this.dataSource =new MatTableDataSource<Gasto>(data);
      this.loading = true;
    })

  }

}

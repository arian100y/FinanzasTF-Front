import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from '../models/Gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  id:number;
  //private url: string = "https://finanzas-tp.herokuapp.com/gastos"
  private url: string = "http://localhost:8080/gastos"
  constructor(private http:HttpClient) {

   }

   saveGasto(id:number){
    this.id = id;
   }
   getGastosByDeuda():Observable<any>{
    return this.http.get<Gasto>( `${this.url}/${this.id}`);
   }
   postGasto(gasto:Gasto):Observable<any>{
     return this.http.post<Gasto>(this.url,gasto);
   }
  }

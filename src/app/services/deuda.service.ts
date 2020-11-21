import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deuda } from '../models/Deuda';

@Injectable({
  providedIn: 'root',
})
export class DeudaService {
  deuda: Deuda;
  //private url: string = 'https://finanzas-tp.herokuapp.com/deudas';
  private url: string = "http://localhost:8080/gastos"
  constructor(private http: HttpClient) {}

  saveDeuda(ded: Deuda) {
    this.deuda = ded;
  }

  getDeuda() {
    return this.deuda;
  }

  registrar(deda: Deuda): Observable<Deuda> {
    return this.http.put<Deuda>(this.url, deda);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { Negocio } from '../models/Negocio';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //private url: string = "https://finanzas-tp.herokuapp.com/clientes"
  private url: string = "http://localhost:8080/clientes"
  constructor(private http:HttpClient) { }

  private cliente = new BehaviorSubject<Cliente>(new Cliente());
  public share = this.cliente.asObservable();

  verifyLogin(nego:Negocio):Observable<any>{
    return this.http.post<any>(`${this.url}/login`,nego);
    }

  registrar(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,cliente);
  }

  saveCliente(cliente:Cliente){
    this.cliente.next(cliente);
  }

  getClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  getClienteByDNI(DNI:Number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/DNI=${DNI}`);
  }

  getClientebyPerfil_id(perfil_id:Number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/perfil_id=${perfil_id}`);
  }
}

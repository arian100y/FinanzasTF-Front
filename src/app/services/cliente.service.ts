import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { Deuda } from '../models/Deuda';
import { Negocio } from '../models/Negocio';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url: string = 'https://finanzas-tp.herokuapp.com/clientes';
  //private url: string = "http://localhost:8080/clientes"
  constructor(private http: HttpClient) {}

  private cliente = new BehaviorSubject<Cliente>(new Cliente());
  private deuda = new BehaviorSubject<Deuda>(new Deuda());
  public share = this.cliente.asObservable();
  public ded = this.deuda.asObservable();
  verifyLogin(nego: Negocio): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, nego);
  }
  verify(client: Cliente): Observable<any> {
    return this.http.post<any>(`${this.url}/verify`, client);
  }

  registrar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }

  saveCliente(cliente: Cliente) {
    this.cliente.next(cliente);
  }
  saveDeuda(deuda: Deuda) {
    this.deuda.next(deuda);
  }
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  getClienteByDNI(DNI: Number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/DNI=${DNI}`);
  }

  getClientebyPerfil_id(perfil_id: Number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/perfil_id=${perfil_id}`);
  }
}

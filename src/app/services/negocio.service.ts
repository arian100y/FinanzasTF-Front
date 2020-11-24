import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Negocio } from '../models/Negocio';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NegocioService {
  private url: string = 'https://finanzas-tp.herokuapp.com/negocios';
  //private url: string = 'http://localhost:8080/negocios';
  constructor(private http: HttpClient) {}

  getNegocios(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(this.url);
  }

  postNegocio(nego: Negocio): Observable<Negocio> {
    return this.http.post<Negocio>(this.url, nego);
  }

  verifyLogin(nego: Negocio): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, nego);
  }

  getNegocioByRUC(ruc: Number): Observable<Negocio> {
    return this.http.get<Negocio>(`${this.url}/RUC=${ruc}`);
  }

  getNegociobyPerfil_id(perfil_id: Number): Observable<Negocio> {
    return this.http.get<Negocio>(`${this.url}/perfil_id=${perfil_id}`);
  }
}

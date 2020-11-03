import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Negocio } from '../models/Negocio';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  private url: string = "https://finanzas-tp.herokuapp.com/negocios"
  constructor(private http: HttpClient) { }

  


  getNegocios():Observable<Negocio[]>{
    
    return this.http.get<Negocio[]>(this.url);
  }

  postNegocio(nego:Negocio):Observable<Negocio>{

    return this.http.post<Negocio>(this.url,nego);
  }

  verifyLogin(nego:Negocio):Observable<any>{
    return this.http.post<any>(`${this.url}/login`,nego);

  }

  
}

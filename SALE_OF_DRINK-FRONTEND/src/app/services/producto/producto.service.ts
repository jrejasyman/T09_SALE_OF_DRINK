import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private API_SERVER = "http://localhost:9191/producto/"
  constructor(private httpClient: HttpClient) {}

  public getAllproducto(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveProducto(producto:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, producto);
  }

  public deleteProducto(idpro: string): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+idpro);
  }

  
}
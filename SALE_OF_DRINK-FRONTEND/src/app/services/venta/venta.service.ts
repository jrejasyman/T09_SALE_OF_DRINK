import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private API_SERVER = "http://localhost:9191/venta/"
  constructor(private httpClient: HttpClient) {}

  public getAllventa(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveVenta(venta:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, venta);
  }

  public deleteVenta(idven: string): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+idven);
  }

  
}
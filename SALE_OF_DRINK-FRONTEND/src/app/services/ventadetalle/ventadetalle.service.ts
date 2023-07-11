import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VentaDetalleService {
  private API_SERVER = "http://localhost:9191/ventadetalle/"
  constructor(private httpClient: HttpClient) {}

  public getAllventadetalle(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveVentadetalle(ventadetalle:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, ventadetalle);
  }

  public deleteVentadetalle(idvendet: string): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+idvendet);
  }

  
}
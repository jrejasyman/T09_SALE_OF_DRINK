import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private API_SERVER = "http://localhost:9191/persona/"
  constructor(private httpClient: HttpClient) {}

  public getAllpersona(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public savePersona(persona:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, persona);
  }

  public deletePersona(idper: string): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+idper);
  }

  
}

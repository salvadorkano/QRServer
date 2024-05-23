import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  //Metodo que obtiene el listado de eventos asignados
  getList(): Observable<any> {
    return this.httpClient.get<any>('https://qr-gate-back.vercel.app/users/');
  }

  create(request: any) {
    return this.httpClient.post<any>(
      'https://qr-gate-back.vercel.app/users/',
      request
    );
  }

  update(request: any) {
    return this.httpClient.put<any>(
      `https://qr-gate-back.vercel.app/users/${request.id}`,
      request
    );
  }

  delete(id: string) {
    return this.httpClient.delete<any>(
      `https://qr-gate-back.vercel.app/users/${id}`
    );
  }
}

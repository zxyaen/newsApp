import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  get(path: string, data?: string): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    if (data) {
      const params = new HttpParams().set('param', data);
      return this.http.get(url, { params })
    }
    return this.http.get(url, { responseType: 'json' })
  }


  post(path: string, body: object): Observable<any> {
    const url = `${this.baseUrl}${path}`
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers: headers })
  }
}

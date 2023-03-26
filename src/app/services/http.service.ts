import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:3000';
  private token = window.localStorage.getItem('token') || ''

  constructor(private http: HttpClient) { }
  // 使用 localhost 存储用户凭证，在请求头带上

  get(path: string, data?: string | null): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    const headers = new HttpHeaders({
      'responseType': 'json',
      'Authorization': this.token
    });
    if (data) {
      const params = new HttpParams().set('param', data);
      return this.http.get(url, { headers, params })
    }
    return this.http.get(url, { headers })
  }


  post(path: string, body: object): Observable<any> {
    const url = `${this.baseUrl}${path}`
    console.log(this.token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.post(url, body, { headers })
  }
}

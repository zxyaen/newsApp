import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  /**
   * @description : 请求跟路径下/user get请求
   * @param        {string} path  添加请求path
   * @return       {string} 返回完整请求路径
   */
  getUser(path: string, name: string): Observable<any> {
    const url = `${this.baseUrl}/user${path}`;
    const params = new HttpParams().set('username', name);
    return this.http.get(url, { params });
  }
  /**
   * @description : 请求跟路径下/user post请求
   * @param        {string} path   添加请求path
   * @param        {JSON} body    请求体，json格式
   * @return       {*}
   */
  postUser(path: string, body: JSON): Observable<any> {
    const url = `${this.baseUrl}/user${path}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers: headers })
  }
}

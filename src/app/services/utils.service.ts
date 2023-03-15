import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }
  // getUser(path: string, name: string): Observable<any> {
  //   const url = `${this.baseUrl}/user${path}`;
  //   const params = new HttpParams().set('username', name);
  //   return this.http.get(url, { params });
  // }
  getLocation(ip: string) {
    // const url = 'ip.taobao.com/service/getIpInfo.php?'
    const url = 'http://ip.taobao.com/service/getIpInfo2.php'
    const params = new HttpParams().set('ip', ip)
    this.http.get(url, { params }).subscribe((res: any) => {
      console.log(res.ip);
    })
  }
}

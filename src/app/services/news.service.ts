import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  token: any = localStorage.getItem('token')
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  };
  constructor(private http: HttpService) { }
  headers = new Headers();
  getFollowUsers() {
    this.headers.append( 'Authorization', this.token)
    return this.http.get('/news/getFollowUsers')
  }

  getRecommendUsers() {
    return this.http.get('/news/getRecommendUsers')
  }

  getNewsEvent() {
    return this.http.get('/newsEvent')
  }
  getPrivyNews(data:object): Observable<any>{
    console.log(data);
    return this.http.post('/news/getPrivyNews',JSON.parse(JSON.stringify(data)))
  }

}

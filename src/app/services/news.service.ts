import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  searchNewsResults: any
  homeSearchNewsResults: any

  token: any = localStorage.getItem('token')
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  };
  constructor(private http: HttpService) { }
  headers = new Headers();
  getAllNews() {
    return this.http.get('/news/getAllNews')
  }

  getRecommendUsers() {
    return this.http.get('/news/getRecommendUsers')
  }


  getPrivyNews(data: object): Observable<any> {
    console.log(data);
    return this.http.post('/news/getPrivyNews', JSON.parse(JSON.stringify(data)))
  }
  getNewsCreateEventByIndex(index: number) {
    console.log('getNewsCreateEventByIndex');
    return this.http.post('/news/getNewsEvent', JSON.parse(JSON.stringify({ index })))
  }

  getNewsByNewsID(newsID: number) {
    return this.http.post('/news/getNewsByNewsID', JSON.parse(JSON.stringify({ newsID })))
  }

  getIndexIDByPath(path: string) {
    return this.http.post('/news/getIndexIDByPath', JSON.parse(JSON.stringify({ path })))
  }

  searchNews(keyWord: string) {
    return this.http.post('/news/searchNews', JSON.parse(JSON.stringify({ keyWord })))
  }

  heartbeatDetection(time: number, id: number, path: string, curContent: string) {
    return this.http.post('/news/heartbeatDetection', JSON.parse(JSON.stringify({ time, id, path, curContent })))
  }

  checkIsDistorted() {
    return this.http.get('/news/checkIsDistorted')
  }
}

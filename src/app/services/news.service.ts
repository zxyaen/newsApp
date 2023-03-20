import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpService) { }
  getFollowUsers() {
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

import { Injectable } from '@angular/core';

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

}

import { Injectable } from '@angular/core';

import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpService) { }
  getFollowUsers() {
    return this.http.getNews('/getFollowUsers')
  }

  getRecommendUsers() {
    return this.http.getNews('/getRecommendUsers')
  }
}

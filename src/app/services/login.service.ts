import { Injectable } from '@angular/core';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpService) { }
  /**
   * @description : 用户登陆
   * @param        {JSON} data  包含account，password
   * @return       {*}
   */  
  Login(data: JSON) {
    return this.http.postUser('/login', data)
  }
}

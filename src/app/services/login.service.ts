import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpService) {
  }
  /**
   * @description : 用户登陆
   * @param        {JSON} data  包含account，password
   * @return       {*}
   */
  Login(data: object) {
    return this.http.postUser('/login', JSON.parse(JSON.stringify(data)))
  }

  async getUserInfo(username: string) {
    return await lastValueFrom(this.http.getUser('/userInfo', username).pipe())
  }

  getSession() {
    return this.http.getUser('/getsession')
  }

  checkSession(sessionID: string) {
    return this.http.getUser('/checksession', sessionID)
  }
}

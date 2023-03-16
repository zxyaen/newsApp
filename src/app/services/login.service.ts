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
    let res = await lastValueFrom(this.http.getUser('/userInfo', username).pipe())
    return res[0]
  }

  getSession() {
    return this.http.get('/getsession')
  }

  async checkSession(sessionID: string) {
    let res = await lastValueFrom(this.http.getUser('/checkSession', sessionID).pipe())
    return res
  }
}

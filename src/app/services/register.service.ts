import { Injectable } from '@angular/core';

import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpService) { }
  /**
   * @description : 查询用户名是否存在
   * @param        {string} path  查询用户名路径
   * @param        {string} username  需要查询的用户名
   * @return       {*}
   */
  IsExitUsername(username: string) {
    return this.http.getUser('/isExitUsername', username);
  }

  /**
   * @description : 用户注册
   * @param        {JSON} data  包含username，password
   * @return       {*}
   */  
  Register(data: JSON) {
    return this.http.postUser('/register', data)
  }
}

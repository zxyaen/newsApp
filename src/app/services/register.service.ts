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
    console.log('IsExitUsername');
    return this.http.get('/user/isExitUsername', username);

  }

  /** 
   * @description : 用户注册
   * @param        {JSON} data  包含username，password
   * @return       {*}
   */
  Register(data: object) {
    return this.http.post('/user/register', JSON.parse(JSON.stringify(data)))
  }
}

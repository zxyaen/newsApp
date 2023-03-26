import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  modifyUserInfo(data: object): Observable<any> {
    return this.http.post('/user/modifyUserInfo', JSON.parse(JSON.stringify(data)))
  }
  modifyUserAvatar(data: object): Observable<any> {
    return this.http.post('/user/modifyUserAvatar', JSON.parse(JSON.stringify(data)))
  }

  checkToken(): Observable<any> {
    let token: any = localStorage.getItem('token')
    let t!: string
    t = token
    return this.http.get('/user/checkToken', JSON.parse(JSON.stringify(t)))
  }

}

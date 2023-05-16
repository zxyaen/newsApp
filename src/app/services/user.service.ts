import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }


  //检查token是否有效
  checkToken(): Observable<any> {
    let token: any = localStorage.getItem('token')
    let t!: string
    t = token
    return this.http.get('/user/checkToken', JSON.parse(JSON.stringify(t)))
  }

}

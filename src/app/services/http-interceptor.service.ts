// import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, tap } from 'rxjs';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpInterceptorService implements HttpInterceptor {

//   constructor(private httpClient: HttpClient) { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
//     let secureReq: HttpRequest<any> = req;
//     // 使用 localhost 存储用户凭证，在请求头带上
//     if (window.localStorage.getItem('token')) {
//       let token = window.localStorage.getItem('token') || ''
//       secureReq = secureReq.clone({
//         url: environment.baseUrl + req.url,
//         headers: req.headers.set('token', token)
//       });

//       return next.handle(secureReq).pipe(
//         tap(
//           (response: any) => {
//             // 处理响应的数据
//             console.log(response)
//           },
//           (error: any) => {
//             // 处理错误的数据
//             console.log(error)
//           }
//         )
//       )
//     }




//   }
// }

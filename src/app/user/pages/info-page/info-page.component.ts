import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
interface user {
  avatar: string,
  username: string,
  account_address: string
}
@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  backgroundImg: string | undefined
  userInfo!: user
  constructor(private router: Router, private loginService: LoginService) {
    let isLoggedIn = localStorage.getItem('session')
    if (isLoggedIn) {
      let session = JSON.parse(isLoggedIn)
      this.loginService.checkSession(session.status).then(res => {
        console.log(res);
        if (res.status == 400) {
          console.log(res);
          // 若session无效，则禁止跳转到用户页，并重定向到主页
          this.router.navigate(['/home']);
        } if (res.status == 200) {
          return
        } else {
          this.router.navigate(['/home']);
        }
      })
    } else {
      this.router.navigate(['/home']);
    }
   }


  async ngOnInit() {
    let session: any = localStorage.getItem('session')
    this.userInfo = await this.loginService.getUserInfo(JSON.parse(session).username)
    console.log(this.userInfo);
  }
}

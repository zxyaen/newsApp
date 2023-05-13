import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';


@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss']
})
export class SettingPageComponent implements OnInit {
  userInfo: any
  constructor(private newService: NewsService, private loginService: LoginService) { }
  ngOnInit(): void {
    this.loginService.getUserInfo().then(
      res => {
        this.userInfo=res
      }
    )
  }
  joinMembership() {
    let confirmed = confirm('确定进行媒体认证吗')
    if (confirmed) {
      this.newService.certified().subscribe(res => {
        console.log(res);
      })
    }
  }
}

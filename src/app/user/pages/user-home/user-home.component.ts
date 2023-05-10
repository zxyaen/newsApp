import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';
declare var JSON: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  list = [
    {
      icon: 'home',
      title: '主页',
      goPage: '/user/homepage'
    }, {
      icon: 'borderless-table',
      title: '探索'
    }, {
      icon: 'setting',
      title: '设置',
      goPage: '/user/settingPage'

    }, {
      icon: 'bell',
      title: '通知',
      isShow: false,
      goPage: '/user/bellPage'
    }, {
      icon: 'user',
      title: '个人资料',
      goPage: '/user/infoPage'
    }]

  form: FormGroup

  constructor(private fb: FormBuilder, private newsService: NewsService) {
    this.form = this.fb.group({
      newThings: this.fb.control('')
    })
  }
  ngOnInit() {
    this.checkIsDistorted()
  }

  checkIsDistorted() {
    return this.newsService.checkIsDistorted().subscribe(
      res => {

        if (res.length != 0) {
          this.list.map(item => {
            if (item.icon == 'bell') {
              item.isShow = true
            }
          })
        }
        console.log(res);
      }
    )
  }



}

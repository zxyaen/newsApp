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
export class UserHomeComponent {
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
      title: '设置'
    }, {
      icon: 'bell',
      title: '通知'
    }, {
      icon: 'mail',
      title: '私信'
    }, {
      icon: 'star',
      title: '书签'
    }, {
      icon: 'profile',
      title: '列表'
    }, {
      icon: 'user',
      title: '个人资料',
      goPage: '/user/infopage'
    }]

  form: FormGroup

  constructor(private fb: FormBuilder, private newsHttp: NewsService) {
    this.form = this.fb.group({
      newThings: this.fb.control('')
    })
  }




}

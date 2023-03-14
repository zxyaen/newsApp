import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface FollowUsers {
  avatar: string,
  name: string,
  date: string,
  newThings: string,
  picture?: string,
  comment?: any[],
  forward?: any[],
  like?: any[],
  hot?: number,
}
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {
  list = [{
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
    title: '个人资料'
  }]
  followUsers: FollowUsers[] = [
    {
      avatar: 'U',
      name: 'Jack',
      date: '2022/03/14',
      newThings: 'Hello yun a yun !',
    }
  ]
  form: FormGroup
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      newThings: this.fb.control('')
    })
  }


  onSubmit() {
    console.log(this.form.value);
  }
}

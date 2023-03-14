import { Component } from '@angular/core';

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
  },]
}

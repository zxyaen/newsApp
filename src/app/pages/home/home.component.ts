import { Component } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private ipfs: IpfsService) { }
  list = [{
    icon: 'borderless-table',
    title: '探索'
  }, {
    icon: 'setting',
    title: '设置'
  },]
}

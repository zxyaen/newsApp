import { Component } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private ipfs:IpfsService){
    this.ipfs.addFileToIpfs('nihao ipfs')
  }
  list = [{
    icon: 'borderless-table',
    title: '探索'
  }, {
    icon: 'setting',
    title: '设置'
  },]
}

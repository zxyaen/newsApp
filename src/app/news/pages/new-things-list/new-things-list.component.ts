import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IpfsService } from 'src/app/services/ipfs.service';
import { UtilsService } from 'src/app/services/utils.service';


interface Users {
  AVATAR: string,
  USERNAME: string,
  RELEASE_TIME: string,
  CONTENT: string,
  PICTURE?: string,
  comments?: string,
  forward?: string,
  likes?: string,
  hot?: number,
  AVATAR_COLOR?: string,
  isPath: Boolean,
  avatarImgBase64: string,
  IPFS_PATH: string
}

@Component({
  selector: 'app-new-things-list',
  templateUrl: './new-things-list.component.html',
  styleUrls: ['./new-things-list.component.scss']
})

export class NewThingsListComponent implements OnInit, OnChanges {
  @Input() newThingsList !: Users[]
  userNewsArr: Users[] = []
  //是否有转发
  forwarded: Boolean = false
  //头像是否是ipfs地址
  isPath: Boolean = false
  constructor(private utilsService: UtilsService, private ipfsService: IpfsService, private router: Router) {
  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.userNewsArr = this.newThingsList
    for (let item of this.userNewsArr) {
      this.testAvatar(item)
      if (item.isPath) {
        this.ipfsService.getFileFromIpfs(item.AVATAR_COLOR).then(res => {
          res = this.utilsService.Utf8ArrayToStr(res)
          const colonIndex = res.indexOf(':'); // 获取冒号的位置
          const result = res.substr(colonIndex + 1).trim(); // 提取冒号后面的部分，并去除空格
          item.avatarImgBase64 = 'data:' + result
        })
      }
    }
    console.log(this.userNewsArr);
  }


  //检查是默认背景色还是已经更换过头像的IPFS path地址
  testAvatar(item: any) {
    const regex = /^#/;
    if (regex.test(item.AVATAR_COLOR)) item.isPath = false
    else item.isPath = true
  }
  goNewsInfo(news: any) {
    console.log(['goNewsInfo']);
    this.router.navigate(['/user/newsInfoPage'], { queryParams: news })
  }
}

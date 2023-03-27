import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpfsService } from 'src/app/services/ipfs.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-news-info-page',
  templateUrl: './news-info-page.component.html',
  styleUrls: ['./news-info-page.component.scss']
})
export class NewsInfoPageComponent implements OnInit {
  news: any
  isPath: Boolean = false
  userInfo: any
  avatarImgBase64!: string
  constructor(private route: ActivatedRoute, private loginService: LoginService, private ipfsService: IpfsService, private utilsService: UtilsService) { }

  async ngOnInit() {
    this.news = this.route.snapshot.queryParams
    console.log(this.news);

    let session: any = localStorage.getItem('session')
    this.userInfo = await this.loginService.getUserInfo(JSON.parse(session).username)
    this.testAvatar()
    if (this.isPath) {
      await this.ipfsService.getFileFromIpfs(this.userInfo.AVATAR_COLOR).then(res => {
        res = this.utilsService.Utf8ArrayToStr(res)
        const colonIndex = res.indexOf(':'); // 获取冒号的位置
        const result = res.substr(colonIndex + 1).trim(); // 提取冒号后面的部分，并去除空格
        this.avatarImgBase64 = 'data:' + result
      })
    }
    console.log(this.userInfo);
  }




  //检查是默认背景色还是已经更换过头像的IPFS path地址
  testAvatar() {
    const regex = /^#/;
    if (regex.test(this.userInfo.AVATAR_COLOR)) this.isPath = false
    else this.isPath = true
  }

}


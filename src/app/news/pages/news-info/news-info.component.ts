import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpfsService } from 'src/app/services/ipfs.service';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.scss']
})
export class NewsInfoComponent implements OnInit {
  news: any
  isPath: Boolean = false
  userInfo: any
  avatarImgBase64!: string
  verifyNewsContent: any
  ipfsContent: any
  constructor(private route: ActivatedRoute, private newsService: NewsService, private loginService: LoginService, private ipfsService: IpfsService, private utilsService: UtilsService) { }

  async ngOnInit() {
    const newsID: number = this.route.snapshot.queryParams['newsID']
    this.newsService.getNewsByNewsID(newsID).subscribe(res => {
      this.news = res[0]
      console.log(this.news);
    })

    this.userInfo = await this.loginService.getUserInfo()
    this.testAvatar()
    // console.log(this.isPath);
    //如果是图片形式头像，获取头像图片
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

  /**
   * @description : 验证新闻
   * @return       {*}
   */
  verifyNews() {
    this.newsService.getIndexIDByPath(this.news.IPFS_PATH).subscribe(res => {
      const index_ID = res[0].INDEX_ID
      this.newsService.getNewsCreateEventByIndex(index_ID).subscribe(res => {
        this.verifyNewsContent = res
      })
    })
    console.log('verifyNews');
  }

  //检查是默认背景色还是已经更换过头像的IPFS path地址
  testAvatar() {
    const regex = /^#/;
    if (regex.test(this.userInfo.AVATAR_COLOR)) this.isPath = false
    else this.isPath = true
  }

}

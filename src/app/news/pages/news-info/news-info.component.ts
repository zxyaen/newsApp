import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpfsService } from 'src/app/services/ipfs.service';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';
import { UtilsService } from 'src/app/services/utils.service';

interface Users {
  IS_VIP: string,
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
  IPFS_PATH: string,
  NID: number
}
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
  curIPFS: any
  options = ['1min', '1hour', '1day', '10day', 'NA'];
  selectedOption: string = 'NA';
  commentList: Users[] = []
  checkNumber!: number
  @ViewChild('select') select: any
  constructor(private route: ActivatedRoute, private newsService: NewsService, private loginService: LoginService, private ipfsService: IpfsService, private utilsService: UtilsService) { }

  async ngOnInit() {


    //处理心跳检测显示
    const newsID: number = this.route.snapshot.queryParams['newsID']
    this.newsService.getNewsByNewsID(newsID).subscribe(res => {
      this.news = res[0]
      console.log(this.news.CHECK_INTERVAL == 60000);
      if (this.news.CHECK_INTERVAL === 'NA') {
        this.selectedOption = 'NA'
      } else if (this.news.CHECK_INTERVAL == 60000) {
        this.selectedOption = '1min'
      } else if (this.news.CHECK_INTERVAL == '3600000') {
        this.selectedOption = '1hour'
      } else if (this.news.CHECK_INTERVAL == '864000000') {
        this.selectedOption = '1day'
      } else if (this.news.CHECK_INTERVAL == '8640000000') {
        this.selectedOption = '10day'
      }
    })
    //处理评论列表新闻
    this.newsService.getCommentList(newsID).subscribe(res => {
      this.commentList = res
    })

    //处理头像
    this.userInfo = await this.loginService.getUserInfo()
    this.testAvatar()
    //如果是图片形式头像，获取头像图片
    if (this.isPath) {
      await this.ipfsService.getFileFromIpfs(this.userInfo.AVATAR_COLOR).then(res => {
        res = this.utilsService.Utf8ArrayToStr(res)
        const colonIndex = res.indexOf(':'); // 获取冒号的位置
        const result = res.substr(colonIndex + 1).trim(); // 提取冒号后面的部分，并去除空格
        this.avatarImgBase64 = 'data:' + result
      })
    }

    //处理心跳检测次数
    this.newsService.curCheckNumber().subscribe(res => {
      this.checkNumber = res[0].CHECK_NUMBER
      if (this.checkNumber <= 0 && this.selectedOption == 'NA') {
        this.select.nativeElement.disabled = true
      }
    })


    console.log(this.userInfo);
  }


  // ngAfterViewInit(): void {

  //   if (Number(this.checkNumber) <= 0) {
  //     console.log('123');
  //     this.select.nativeElement.disabled = true
  //   }
  // }

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

    this.ipfsService.addToIPFS(this.news.CONTENT).then(res => {
      this.curIPFS = res
    })

  }

  //判断新闻是否为当前用户发布
  isNowUser() {
    if (this.userInfo.ACCOUNT_ADDRESS === this.news.ACCOUNT_ADDRESS) return true
    else return false
  }

  //心跳检测

  check() {
    let time = 60 * 1000
    switch (this.selectedOption) {
      case '1min':
        console.log('Oranges are $0.59 a pound.');
        break;
      case '1hour':
        time = 60 * 60 * 1000
        console.log('12332');
        break
      case '1day':
        time = 24 * 60 * 60 * 1000
        console.log('Mangoes and papayas are $2.79 a pound.');
        break;
      case '10day':
        time = 10 * 24 * 60 * 60 * 1000
        console.log('213');
        break;
      case 'NA':
        time = 0
        break
    }
    if(time == 0){
      this.newsService.heartbeatDetection(time, this.news.NEWS_ID, this.news.IPFS_PATH, this.news.CONTENT, this.checkNumber + 1).subscribe(res => {})

    }else{
      this.newsService.heartbeatDetection(time, this.news.NEWS_ID, this.news.IPFS_PATH, this.news.CONTENT, this.checkNumber - 1).subscribe(res => {})

    }
    if (this.checkNumber <= 0) {
      this.select.nativeElement.disabled = true
    }
    window.location.reload()
  }

  //检查是默认背景色还是已经更换过头像的IPFS path地址
  testAvatar() {
    const regex = /^#/;
    if (regex.test(this.userInfo.AVATAR_COLOR)) this.isPath = false
    else this.isPath = true
  }


}

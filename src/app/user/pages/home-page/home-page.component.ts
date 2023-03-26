import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs.service';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Utils } from 'src/app/utils/utils';

interface Users {
  AVATAR: string,
  USERNAME: string,
  RELEASE_TIME: string,
  CONTENT: string,
  picture?: string,
  comments?: string,
  forward?: string,
  likes?: string,
  hot?: number,
  AVATAR_COLOR?: string,
  isPath: Boolean,
  avatarImgBase64: string,
  IPFS_PATH: string
}
interface User {
  AVATAR: string,
  AVATAR_COLOR: string,
  USERNAME: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  forwarded: Boolean = false
  recommendedPeople: Boolean = true
  focusOnPeople: Boolean = false
  followUsers: Users[] = []
  recommendUsers: Users[] = []
  userInfo: User = {
    AVATAR: '',
    AVATAR_COLOR: '',
    USERNAME: ''
  }
  AVATAR: any
  isPath: Boolean = false
  constructor(private newsService: NewsService, private ipfsService: IpfsService, private loginService: LoginService, private utilsService: UtilsService, private userService: UserService) {
    // let isLoggedIn = localStorage.getItem('session')
    // if (isLoggedIn) {
    //   let session = JSON.parse(isLoggedIn)
    //   this.loginService.checkSession(session.status).then(res => {
    //     console.log(res);
    //     if (res.status == 400) {
    //       console.log(res);
    //       // 若session无效，则禁止跳转到用户页，并重定向到主页
    //       this.router.navigate(['/home']);
    //     } if (res.status == 200) {
    //       return
    //     } else {
    //       this.router.navigate(['/home']);
    //     }
    //   })
    // } else {
    //   this.router.navigate(['/home']);
    // }
  }


  async ngOnInit() {
    let session: any = localStorage.getItem('session')
    this.userService.checkToken().subscribe(res=>{
      console.log(res);
    })
      this.userInfo = await this.loginService.getUserInfo(JSON.parse(session).username)
    this.getAllNews()
    this.testAvatar()
    if (this.isPath) {
      await this.ipfsService.getFileFromIpfs(this.userInfo.AVATAR_COLOR).then(res => {
        res = this.utilsService.Utf8ArrayToStr(res)
        const colonIndex = res.indexOf(':'); // 获取冒号的位置
        const result = res.substr(colonIndex + 1).trim(); // 提取冒号后面的部分，并去除空格
        this.AVATAR = 'data:' + result
      })
    }

  }

  //检查是默认背景色还是已经更换过头像的IPFS path地址
  testAvatar() {
    const regex = /^#/;
    if (regex.test(this.userInfo.AVATAR_COLOR)) this.isPath = false
    else this.isPath = true
  }

  changeList(flag: string) {
    if (flag === '1') {
      this.recommendedPeople = true
      this.focusOnPeople = false
    }
    else {
      this.recommendedPeople = false,
        this.focusOnPeople = true
    }
  }

  //获取推荐列表和我的关注列表新闻
  getAllNews() {
    this.newsService.getFollowUsers().subscribe(res => {
      this.followUsers = res
    })
    this.newsService.getRecommendUsers().subscribe(res => {
      this.recommendUsers = res
    })
  }
}

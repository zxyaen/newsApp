import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IpfsService } from 'src/app/services/ipfs.service';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
interface User {
  AVATAR: string
  USERNAME: string
  ACCOUNT_ADDRESS: string,
  AVATAR_COLOR: string,
  RELEASE_TIME: string,
  REGISTRATION_TIME: string,
  FOLLOWS: string,
  FANS: string,
  CONTENT: string,
  PICTURE?: string,
  comments?: string,
  forward?: string,
  likes?: string,
  hot?: number,
  isPath: Boolean,
  avatarImgBase64: string,
  IPFS_PATH: string
}
@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  userInfo: User = {
    AVATAR: '',
    USERNAME: '',
    ACCOUNT_ADDRESS: '',
    AVATAR_COLOR: '',
    RELEASE_TIME: '',
    REGISTRATION_TIME: '',
    FOLLOWS: '',
    FANS: '',
    isPath: false,
    CONTENT: '',
    avatarImgBase64: '',
    IPFS_PATH: ''
  }
  myNews: User[] = []
  form: FormGroup

  intro: any = null
  birthday: any = null
  location: any = null

  backgroundImg: string | undefined 
  avatarImgBase64: any = null
  isEdit: Boolean = false
  isPath: Boolean = false

  constructor(private ipfsService: IpfsService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private newsService: NewsService) {
    this.form = this.fb.group({
      intro: this.fb.control(''),
      location: this.fb.control(''),
      birthday: this.fb.control('')
    })
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
    this.getPrivyNews()
  }

  //检查是默认背景色还是已经更换过头像的IPFS path地址
  testAvatar() {
    const regex = /^#/;
    if (regex.test(this.userInfo.AVATAR_COLOR)) this.isPath = false
    else this.isPath = true
  }

  getPrivyNews() {
    this.newsService.getPrivyNews({ username: this.userInfo.USERNAME }).subscribe(res => {
      for(let item of res[1]){
        Object.assign(item,res[0][0])
      }
      this.myNews= res[1]
    })
  }

  //提交修改用户信息表单
  onSubmit() {
    this.isEdit = false
    window.location.reload()
  }


}

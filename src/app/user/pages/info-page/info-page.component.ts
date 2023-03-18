import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
interface user {
  AVATAR: string
  USERNAME: string
  ACCOUNT_ADDRESS: string,
  AVATAR_COLOR: string,
  RELEASE_TIME: string,
  follows?: number,
  followed?: number,
}
@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  backgroundImg: string | undefined
  userInfo: user = {
    AVATAR: '',
    USERNAME: '',
    ACCOUNT_ADDRESS: '',
    AVATAR_COLOR: '',
    RELEASE_TIME: '',
    follows: 0,
    followed: 0
  }
  isEdit: Boolean = false
  constructor(private router: Router, private loginService: LoginService) {
    let isLoggedIn = localStorage.getItem('session')
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      this.uploadImage(file);
    } else {
      alert('只能上传jpg和png格式的图片');
    }
  }
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData);
    // this.http.post('https://example.com/upload', formData).subscribe(
    //   (response) => {
    //     console.log('上传成功');
    //   },
    //   (error) => {
    //     console.error('上传失败');
    //   }
    // );
  }

  async ngOnInit() {
    let session: any = localStorage.getItem('session')
    this.userInfo = await this.loginService.getUserInfo(JSON.parse(session).username)
    console.log(this.userInfo);
  }
}

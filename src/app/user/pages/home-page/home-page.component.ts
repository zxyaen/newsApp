import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';

interface Users {
  avatar: string,
  username: string,
  dates: string,
  content: string,
  picture?: string,
  comments?: string,
  forward?: string,
  likes?: string,
  hot?: number,
  avatar_color?: string
}
interface User {
  avatar: string,
  avatar_color: string,
  username: string
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
    avatar: '',
    avatar_color: '',
    username: ''
  }


  constructor(private newsService: NewsService, private router: Router, private loginService: LoginService) {
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
    console.log(this.userInfo);
    this.getAllNews()
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

  getAllNews() {
    this.newsService.getFollowUsers().subscribe(res => {
      // console.log((res[0].comments));
      this.followUsers = res
    })
    this.newsService.getRecommendUsers().subscribe(res => {
      this.recommendUsers = res
      // console.log(res);
    })
  }
}

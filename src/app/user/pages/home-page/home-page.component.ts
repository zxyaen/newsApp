import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';

interface Users {
  avatar: string,
  username: string,
  dates: string,
  newThings: string,
  picture?: string,
  comments?: string,
  forward?: string,
  likes?: string,
  hot?: number,
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
  userInfo: any

 constructor(private newsService: NewsService, private route: ActivatedRoute, private loginService: LoginService) {
    this.userInfo =  this.loginService.getUserInfo(this.route.snapshot.queryParams['username'])

  }

  async ngOnInit() {
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
    })
  }
}

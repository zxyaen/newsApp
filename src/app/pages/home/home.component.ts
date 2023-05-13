import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs.service';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';
interface Users {
  IS_VIP: string,
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
  IPFS_PATH: string,
  isSearch: Boolean
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  allNews: Users[] = []
  constructor(private newsService: NewsService) { }
  ngOnInit() {
    this.getAllNews()
  }
  list = [{
    icon: 'borderless-table',
    title: '探索'
  }, {
    icon: 'setting',
    title: '设置'
  },]

  getAllNews() {
    this.newsService.getAllNews().subscribe(res => {
      this.allNews = res
      console.log(res);
    })
  }

  onSearchNews(){
    this.allNews = this.newsService.searchNewsResults
  }

}

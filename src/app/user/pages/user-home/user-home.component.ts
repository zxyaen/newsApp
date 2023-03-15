import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewsService } from 'src/app/services/news.service';
declare var JSON: any;
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
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  forwarded: Boolean = false
  recommendedPeople: Boolean = true
  focusOnPeople: Boolean = false
  list = [{
    icon: 'borderless-table',
    title: '探索'
  }, {
    icon: 'setting',
    title: '设置'
  }, {
    icon: 'bell',
    title: '通知'
  }, {
    icon: 'mail',
    title: '私信'
  }, {
    icon: 'star',
    title: '书签'
  }, {
    icon: 'profile',
    title: '列表'
  }, {
    icon: 'user',
    title: '个人资料'
  }]
  followUsers: Users[] = []
  recommendUsers: Users[] = []
  ribbonList = [{
    type: 'message',
    number: null
  }, {
    type: 'retweet',
    number: null
  }, {
    type: 'like',
    number: null
  }, {
    type: 'bar-chart',
    number: null
  }, {
    type: 'upload',
  }]
  form: FormGroup

  constructor(private fb: FormBuilder, private newsHttp: NewsService) {
    this.form = this.fb.group({
      newThings: this.fb.control('')
    })
  }
  async ngOnInit(): Promise<void> {
    await this.getAllNews()
    this.getIconNumber()
  }

  getAllNews() {
    this.newsHttp.getFollowUsers().subscribe(res => {
      // console.log((res[0].comments));
      this.followUsers = res
    })
    this.newsHttp.getRecommendUsers().subscribe(res => {
      this.recommendUsers = res
    })
  }

  getIconNumber() {
    console.log(this.followUsers);
    this.followUsers.forEach(e => {
      console.log('122223');
      console.log(e.comments);
    });
  }


  onSubmit() {
    console.log(this.form.value);
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
}

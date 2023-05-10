import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface item {
  icon: string,
  title: string,
  goPage?: string,
  isShow?: boolean
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() list: item[] = []

  constructor(private router: Router) { }
  clearToken() {
    alert('确定退出登录吗')
    localStorage.removeItem('token')
  }

  goPage(url: string | undefined) {
    if (url) {
      this, this.router.navigateByUrl(url)
    }
  }

}

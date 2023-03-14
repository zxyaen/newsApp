import { Component, Input } from '@angular/core';

interface obj {
  icon: string,
  title: string
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() list: obj[] = []
}

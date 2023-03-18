import { Component, Input } from '@angular/core';
import { flush } from '@angular/core/testing';


interface Users {
  AVATAR: string,
  USERNAME: string,
  RELEASE_TIME: string,
  CONTENT: string,
  PICTURE?: string,
  comments?: string,
  forward?: string,
  likes?: string,
  hot?: number,
  AVATAR_COLOR?: string
}
@Component({
  selector: 'app-new-things-list',
  templateUrl: './new-things-list.component.html',
  styleUrls: ['./new-things-list.component.scss']
})

export class NewThingsListComponent {
  @Input() newThingsList !: Users[]
  forwarded: Boolean = false
  constructor() { }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

import { Component, Input } from '@angular/core';
import { flush } from '@angular/core/testing';


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
  selector: 'app-new-things-list',
  templateUrl: './new-things-list.component.html',
  styleUrls: ['./new-things-list.component.scss']
})

export class NewThingsListComponent {
  @Input() newThingsList !: Users[]
  forwarded: Boolean = false
}

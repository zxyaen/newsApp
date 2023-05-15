import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IpfsService } from 'src/app/services/ipfs.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-publish-content',
  templateUrl: './publish-content.component.html',
  styleUrls: ['./publish-content.component.scss']
})
export class PublishContentComponent implements OnInit {
  NID: number = -1
  content: string = ''
  showEmoji: Boolean = false
  latitude: any
  longitude: any
  constructor(private fb: FormBuilder, private ipfsService: IpfsService, private utilsService: UtilsService) {

  }
  ngOnInit(): void {
    console.log(this.NID);
  }

  addEmoji(e: { emoji: any; }) {
    this.content = `${this.content}${e.emoji.native}`
    console.log(e.emoji.native);
  }
  getLocation() {
    this.utilsService.getLocation('202.100.100.0')
  }
  onSubmit() {
    console.log(this.NID);
    this.ipfsService.addFileToIpfs(this.content, this.NID)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  stopPropagation(e: Event) {
    this.showEmoji = false
    e.stopPropagation()
  }
}

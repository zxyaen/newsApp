import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IpfsService } from 'src/app/services/ipfs.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-publish-content',
  templateUrl: './publish-content.component.html',
  styleUrls: ['./publish-content.component.scss']
})
export class PublishContentComponent implements OnInit {
  // form: FormGroup
  content: string = ''
  showEmoji: Boolean = false
  latitude:any
  longitude:any
  constructor(private fb: FormBuilder, private ipfsService: IpfsService,private utilsService:UtilsService) {
    // this.form = this.fb.group({
    //   newThings: this.fb.control('')
    // })
  }
  ngOnInit(): void {
  }

  addEmoji(e: { emoji: any; }) {
    this.content = `${this.content}${e.emoji.native}`
    console.log(e.emoji.native);
  }
  getLocation(){
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log(position);
    //     this.latitude = position.coords.latitude;
    //     this.longitude = position.coords.longitude;
    //   },
    //   (error) => console.log(error)
    // );
    this.utilsService.getLocation('202.100.100.0')
  }
  onSubmit() {
    console.log(this.content);
    this.ipfsService.addFileToIpfs(this.content)
  }
}

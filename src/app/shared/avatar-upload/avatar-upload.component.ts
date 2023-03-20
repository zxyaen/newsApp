import { Component, EventEmitter, Input, OnChanges, ChangeDetectorRef, Output, SimpleChanges } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnChanges {
  @Input() avatarColor: any
  //可能存储初始头像可能存储path
  avatarOrPath: any
  base64Avatar: any
  isPath: Boolean = false

  constructor(private ipfsService: IpfsService, private utilsService: UtilsService) { }
  async ngOnChanges(changes: SimpleChanges): Promise<any> {
    this.avatarOrPath = this.avatarColor
    this.testAvatar()
    if (this.isPath) {
      let path = this.avatarOrPath
      //请求ipfs获取头像
      await this.ipfsService.getFileFromIpfs(path).then(res => {
        res = this.utilsService.Utf8ArrayToStr(res)
        const colonIndex = res.indexOf(':'); // 获取冒号的位置
        const result = res.substr(colonIndex + 1).trim(); // 提取冒号后面的部分，并去除空格
        this.base64Avatar = 'data:' + result
      })
    }
  }

  //获取上传的用户头像并存入ipfs
  async handleFiles(event: any) {
    let file = this.utilsService.compressionFile(event.target.files[0])
    let _this = this
    if (event.target) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        // @ts-ignore
        _this.base64Avatar = e.target.result;
        _this.testAvatar()
        let newPath = this.ipfsService.addImageToIpfs(this.base64Avatar)
      };
      reader.readAsDataURL(await file);
    }

  }

  //检查目前使用的是默认头像还是用户修改的头像
  testAvatar() {
    const regex = /^#/;
    if (regex.test(this.avatarOrPath)) this.isPath = false
    else this.isPath = true
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  getLocation(ip: string) {
    // const url = 'ip.taobao.com/service/getIpInfo.php?'
    const url = 'http://ip.taobao.com/service/getIpInfo2.php'
    const params = new HttpParams().set('ip', ip)
    this.http.get(url, { params }).subscribe((res: any) => {
      console.log(res.ip);
    })
  }

  // 生成随机颜色
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  //将unitArray转化成base64
  Utf8ArrayToStr(array: any) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
        default:
          break;
      }
    }
    return out
  }


  /**
   * 图片压缩方法
   * @param {Object}  file 图片文件
   * @param {String} type 想压缩成的文件类型
   * @param {Nubmber} quality 压缩质量参数
   * @returns 压缩后的新图片
   */
  async compressionFile(file:any, type = 'image/jpeg', quality = 0.5) {
    //压缩图片
    const fileToDataURL = (file: Blob): Promise<any> => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = (e) => resolve((e.target as FileReader).result)
        reader.readAsDataURL(file)
      })
    }
    const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = dataURL
      })
    }
    const canvastoFile = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> => {
      return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality))
    }
    const fileName = file.name
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const base64 = await fileToDataURL(file)
    const img = await dataURLToImage(base64)
    canvas.width = img.width
    canvas.height = img.height
    context.clearRect(0, 0, img.width, img.height)
    context.drawImage(img, 0, 0, img.width, img.height)
    const blob = (await canvastoFile(canvas, type, quality)) as Blob // quality:0.5可根据实际情况计算
    const newFile = await new File([blob], fileName, {
      type: type
    })
    return newFile
  }

}

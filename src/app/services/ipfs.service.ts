import { Injectable } from '@angular/core';
import * as ipfs from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  IPFS = ipfs.create({
    host: "localhost",
    port: 5001,
    protocol: "http"
  })

  path: string = ''
  constructor(private http: HttpService) { }

  /**
   * @description : 将发布内容存到IPFS中，再将IPFS返回值与发布内容备份到数据库和智能合约的事件中
   * @param        {string} text 发布内容
   * @return       {*}  返回数据在IPFS上存储的路径
   */
  async addFileToIpfs(text: string) {
    let session: any = localStorage.getItem('session')
    session = JSON.parse(session)
    let data = { text, username: session.username, address: session.account }
    const res = await this.IPFS.add(Buffer.from(JSON.stringify(data)))
    const saveData = { res, data }
    this.saveIpfsFileToContract(saveData).subscribe(res => {
      if (res.err) {
        console.log(res);
      }
      console.log(res);
    })
    this.saveIpfsFileToDB(saveData).subscribe(res => {
      console.log(res.data);
    })
  }

  saveIpfsFileToDB(data: object): Observable<any> {
    return this.http.post('/news/saveFile', JSON.parse(JSON.stringify(data)));
  }
  saveIpfsFileToContract(data: object): Observable<any> {
    return this.http.post('/news/saveToContract', JSON.parse(JSON.stringify(data)))
  }


  //将图片存到ipfs
  async addImageToIpfs(base64: string) {
    let session: any = localStorage.getItem('session')
    session = JSON.parse(session)
    const res = await this.IPFS.add(base64)
    const path = res.path
    const saveData = { res, username: session.username }
    this.saveAvatarIpfsToDB(saveData).subscribe(res => {
      console.log(res.data);
    })
    return path
  }
  saveAvatarIpfsToDB(data: object): Observable<any> {
    return this.http.post('/user/saveAvatar', JSON.parse(JSON.stringify(data)));
  }


  //取出头像
  async getFileFromIpfs(path: any): Promise<any> {
    try {
      // 从IPFS获取文件数据
      const asyncIterator = this.IPFS.get(path);
      // 使用 for await...of 语句迭代异步迭代器，获取文件数据
      for await (const data of asyncIterator) {
        // 返回文件数据
        return data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

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
   * @description : 将发布内容存到IPFS中，再将IPFS返回值与发布内容备份到数据库
   * @param        {string} text
   * @return       {*}  返回数据在IPFS上存储的路径
   */

  async addFileToIpfs(text: string) {
    let session: any = localStorage.getItem('session')
    session = JSON.parse(session)
    let data = { text, username: session.username, address: session.account }
    const buffer = Buffer.from(JSON.stringify(data))
    const res = await this.IPFS.add(buffer)
    const saveData = { res, data }
    this.saveIpfsFileToContract(saveData).subscribe(res => {
      console.log(res);
    })
    this.saveIpfsFileToDB(saveData).subscribe(res => {
      console.log(res.data);
    })
  }

  saveIpfsFileToDB(data: object): Observable<any> {
    return this.http.postIpfs('/saveFile', JSON.parse(JSON.stringify(data)));
  }
  saveIpfsFileToContract(data: object): Observable<any> {
    return this.http.postIpfs('/saveToContract', JSON.parse(JSON.stringify(data)))
  }

  async getFileFromIpfs() {
    const path = `/ipfs/${this.path}`;
    const files = await this.IPFS.get(path);
    console.log(files);
    for await (const file of files) {
      const content = [];
      for await (const chunk of file) {
        content.push(chunk);
      }
      console.log(content.toString());
    }
  }

}

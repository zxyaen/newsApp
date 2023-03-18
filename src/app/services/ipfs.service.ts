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
      if(res.err){
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
}

import { Injectable } from '@angular/core';
import * as ipfs from 'ipfs-http-client';
import { Buffer } from 'buffer';


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
  constructor() {

  }
  async addFileToIpfs(obj: any) {
    const buffer = Buffer.from(obj)
    const res = await this.IPFS.add(buffer)
    this.path = res.path
    // const res = await this.IPFS.add('hello ipfs')
    console.log(res);
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

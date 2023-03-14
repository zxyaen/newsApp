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
  constructor() {

  }
  async addFileToIpfs(obj:any) {
    const buffer = Buffer.from(obj)
    // const res = await this.IPFS.add(buffer)
    // const res = await this.IPFS.add('hello ipfs')
    // console.log(res);

  }
}

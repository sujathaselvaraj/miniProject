import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NodeapiService {
  public endpt = "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudant.com/";
  public password = "f56766c5716a7b37a531aaa7bdb53315";
  public username = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
  basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
  url!: string;

  constructor(public http: HttpClient, public toastr: ToastrService) {
    console.log('Node Working')

  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };

  storedata(FormData: any) {
    console.log("Node Working🤩", FormData);
    return this.http.post<any>('http://localhost:8000/postdata/', FormData);
  }

  test_get(id: any) {
    return this.http.get<any>('http://localhost:8000/getdata/' + id)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeapiService {

  constructor(public http: HttpClient) {
    console.log('Node Working')

  }


  storedata(FormData: any) {
    console.log("Node Working🤩", FormData);
    return this.http.post<any>('http://localhost:8000/postdata/', FormData);
  }

  check_get(id: any) {
    return this.http.get<any>('http://localhost:8000/getdata/' + id)
  }
}

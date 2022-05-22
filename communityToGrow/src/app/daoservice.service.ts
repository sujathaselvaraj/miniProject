import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DaoserviceService {

  public endpt = "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudant.com/";
  public password = "f56766c5716a7b37a531aaa7bdb53315";
  public username = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
  httpOptions: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | string[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; } | undefined;


  constructor(private http: HttpClient) {
    console.log("working")
  }
  postDetails(formValues: any, db: any) {

    const url = this.endpt + db;
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    return this.http.post(url, formValues, { headers: { Authorization: basicAuth } });
  }

}

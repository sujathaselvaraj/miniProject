import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeapiService {
  public endpt = "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudant.com/";
  public password = "f56766c5716a7b37a531aaa7bdb53315";
  public username = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
  basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
  url!: string;

  constructor(public http: HttpClient) {
    console.log('Node Working')

  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };
  postDetails(doc: object, db: String): Observable<{}> {

    //  fresher- sample;

    const url = this.endpt + db;
    return this.http.post(url, doc, this.httpOptions)
    // return this.http.post(this.url, formValues, { headers: { Authorization: this.basicAuth } });
  }
  storedata(FormData: any) {
    console.log("Node Working🤩", FormData);
    return this.http.post<any>('http://localhost:8000/postdata/', FormData)
  }
  login(datas: any) {
    const url = this.endpt + 'project_db/_find';
    let loginData = {
      username: this.username,
      password: this.password
    },
      fields: ["username", "password"]
    return this.http.post(url, loginData)
  }
  // login(formvalue: any) {
  //       console.log(formvalue);
  //       return this.http.get<any>('http://localhost:4200/postquery/', formvalue);


  //     }


}
// login(datas: any) {
//   // throw new Error('Function not implemented.');
// }

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class NodeapiService {
//   public endpt = "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudant.com/";
//   public password = "f56766c5716a7b37a531aaa7bdb53315";
//   public username = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
//   basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
//   url!: string;
//   constructor(private http: HttpClient) {
//     console.log('Node Working')
//   }
//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': this.basicAuth
//     })
//   };
//   postDetails(doc: object, db: String): Observable<{}> {

//     //  fresher- sample;

//     const url = this.endpt + db;
//     return this.http.post(url, doc, this.httpOptions)
//     return this.http.post(this.url, formaValues, { headers: { Authorization: this.basicAuth } });
//   }
//   get(db: string): Observable<{}> {
//     const url = this.endpt + db + '/_all_docs?include_docs=true';
//     return this.http.get(url, this.httpOptions);

//   }
//   storedata(formvalue: any) {
//     console.log(formvalue);
//     return this.http.post<any>('http://localhost:4200/postquery', formvalue);
//   }
// login(datas: any) {
//   const url = this.endpoint + 'login_details_db/_find';
//    let loginData={
//      email:email
//     password:password
//   },
//   let data = {
//     selector: {
//       email: datas.email,
//       password: datas.password
//     }
//   }



//   // ----fields:["id","name","email"]
//   // return this.http.post(url,data,this.httpOptions)

//   // };
//   login(formvalue: any) {
//     console.log(formvalue);
//     return this.http.get<any>('http://localhost:4200/postquery/', formvalue);


//   }






// }

// function formaValues(url: any, formaValues: any, arg2: { headers: { Authorization: any; }; }): Observable<{}> {
//   throw new Error('Function not implemented.');
// }

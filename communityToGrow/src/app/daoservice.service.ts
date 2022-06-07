import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DaoserviceService {
  userData: any;
  userId: any;
  id: any;
  // authentication Credentials declaration
  public endpt = "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudant.com/";
  public password = "f56766c5716a7b37a531aaa7bdb53315";
  public username = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
  basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
  url = this.endpt + 'project_db';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth

    })
  };

  constructor(private http: HttpClient) {


  }
  // function to post the data in couchdb


  postDetails(formValues: any) {
    return this.http.post(this.url, formValues, this.httpOptions);
  }
  //function to get all the data in couchDb
  getAllDetails(database: any) {

    const geturl = this.endpt + database + "/_all_docs?include_docs=true";
    return this.http.get(geturl, this.httpOptions);
  }
  // function to get the data from couchDb which has type Volunteer
  details(findType: any) {

    const geturl = this.url + '/_find';
    let object = {
      selector: {
        "type": findType
      },
    };
    return this.http.post(geturl, object, this.httpOptions)
  }


  // function to get lookups id
  fetchDataUsingFind(dataBaseName: string, querObj: any, fields: Array<string>) {

    const geturl = this.endpt + dataBaseName + '/_find';
    let dataObject = {
      selector: querObj,
      fields: fields
    };
    return this.http.post(geturl, dataObject, this.httpOptions)
  }
  getAll(type: Array<string>) {
    console.log(type);
    const geturl = `${this.endpt}project_db/_all_docs?include_docs=true&keys=["` + type.join('","') + `"]`
    return this.http.get(geturl, this.httpOptions);
  }
  // viewDoctor() {

  //   const geturl = `${this.endpt}project_db/_design/project_view/_view/doctor-view?include_docs=true&keys=["Doctor` + this.id + `"]`;
  //   return this.http.get(geturl, this.httpOptions);

  // }
  // viewVolunteer() {
  //   const geturl = `${this.endpt}project_db/_design/project_view/_view/doctor-view?include_docs=true&keys=["Volunteer` + this.id + `"]`;
  //   return this.http.get(geturl, this.httpOptions);

  // }
  viewDocumentFetch(type: string) {
    this.userData = JSON.parse(localStorage.getItem('usrData') || '{}')
    this.userId = this.userData
    this.id = this.userId._id;
    console.log(this.id)
    const geturl = `${this.endpt}project_db/_design/project_view/_view/doctor-view?include_docs=true&keys=["${type + this.id}"]`;
    return this.http.get(geturl, this.httpOptions);

  }
}



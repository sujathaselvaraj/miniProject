import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  httpOptions: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | string[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; } | undefined;


  constructor(private http: HttpClient) {
    this.userData = JSON.parse(localStorage.getItem('usrData') || '{}')
    this.userId = this.userData;
    this.id = this.userId._id;
    console.log("working")
  }
  // function to post the data in couchdb
  postDetails(formValues: any, db: any) {

    const url = this.endpt + db;
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    return this.http.post(url, formValues, { headers: { Authorization: basicAuth } });
  }
  //function to get all the data in couchDb
  getAllDetails(db: any) {

    const url = this.endpt + db + "/_all_docs?include_docs=true";
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    return this.http.get(url, { headers: { Authorization: basicAuth } });
  }
  // function to get the data from couchDb which has type Volunteer
  volunteerDetails(db: any) {

    const url = this.endpt + db + '/_find';
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    let object = {
      selector: {
        "type": "Volunteer"
      },
      fields: ["first_name", "last_name", "gender", "type", "mobileNo", "emailId"]
    };
    return this.http.post(url, object, { headers: { Authorization: basicAuth } })
  }
  // function to get the data from couchDb which has type Patient

  patientDetails(db: any) {

    const url = this.endpt + db + '/_find';
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    let object = {
      selector: {
        "type": "Patient"
      }
      // ,
      // fields: ["f_name", "l_name", "gender", "type", "phone_number", "email", "disorder", "listofvolunteer"]
    };
    return this.http.post(url, object, { headers: { Authorization: basicAuth } })
  }

  // function to get the data from couchDb which has type Doctor

  doctorDetails(db: any) {

    const url = this.endpt + db + '/_find';
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    let object = {
      selector: {
        "type": "Doctor"
      },
      fields: ["first_name", "last_name", "gender", "type", "mobileNo", "emailId", "disorder"]
    };
    return this.http.post(url, object, { headers: { Authorization: basicAuth } })
  }
  // function to get lookups id
  fetchDataUsingFind(dataBaseName: string, querObj: any, fields: Array<string>) {

    const url = this.endpt + dataBaseName + '/_find';
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    let dataObject = {
      selector: querObj,
      fields: fields
    };
    return this.http.post(url, dataObject, { headers: { Authorization: basicAuth } })
  }
  fetchDataUsing(dataBaseName: string, querObj: any, fields: Array<string>) {

    const url = this.endpt + dataBaseName + '/_find';
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    let dataObject = {
      selector: querObj,
      fields: fields
    };
    return this.http.post(url, dataObject, { headers: { Authorization: basicAuth } })
  }
  getAll(type: Array<string>) {
    console.log(type);
    const url = `${this.endpt}project_db/_all_docs?include_docs=true&keys=["` + type.join('","') + `"]`
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    return this.http.get(url, { headers: { Authorization: basicAuth } });
  }
  view() {
    console.log(this.id, "parentid")
    const url = `${this.endpt}project_db/_design/project_view/_view/doctor-view?include_docs=true&keys=["Doctor560144b284334dea51da07c80bb4669c"]`;
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    return this.http.get(url, { headers: { Authorization: basicAuth } });

  }
}



import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import * as lodash from 'lodash'
@Component({
  selector: 'app-patient-detail-update',
  templateUrl: './patient-detail-update.component.html',
  styleUrls: ['./patient-detail-update.component.css']
})
export class PatientDetailUpdateComponent implements OnInit {
  volunteerList: any = [''];

  locationList: any = [''];
  volunteerName: any = [''];
  bloodGroup: any = ['A+ve', 'A1+ve', 'A1B+ve', 'B+ve', 'O+ve', 'AB+ve', 'A-ve', 'A1-ve', 'A1B-ve', 'B-ve', 'O-ve', 'AB-ve']

  isShown: boolean = true;
  isHide: boolean = false;
  isShow: boolean = false;


  patientForm: FormGroup;
  patientallRecord: any = [];
  details: any = {
    f_name: '',
    l_name: '',
    age: '',
    gender: '',
    bloodgroup: '',
    aadhar: '',
    location: '',
    phone_number: '',
    email: '',
    disorder: '',
    listofvolunteer: '',
    helper_name: '',
    type: '',
    Login: ''
  }
  userData: any;
  userId: any;
  id: any;
  alldata: any;
  lookupIdArray: any = [];
  patientRecord: any;
  patientdetail: any;

  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, public http: HttpClient, private toastr: ToastrService) {
    //getting the parent id from localStorage


    this.patientForm = this.fb.group({
      f_name: [this.details.f_name],
      l_name: [this.details.l_name],
      age: [this.details.age],
      gender: [this.details.gender],
      location: [this.locationList._id],
      bloodgroup: [this.bloodGroup.value],
      aadhar: [this.details.aadhar],
      phone_number: [this.details.phone_number],
      email: [this.details.email],
      disorder: [this.details.disorder],
      listofvolunteer: [this.volunteerList._id],
      type: [this.details.disorder],
      Login: [this.id],
      volunteerName: [this.volunteerList.first_name]


    })
    this.locationfetch();
    this.volunteerfetch();
    if (!this.isHide) {
      this.patientdata();
    };
    if (!this.isShow) {
      this.patientview();
    }
  }
  toggleShown() {
    this.patientDetailSubmission();
  }

  toggleHide() {
    this.isShown = !this.isShown;
    this.isHide = !this.isHide;
    this.patientdata();
  }
  toggleShow() {

    this.isShown = !this.isShown;
    this.isShow = !this.isShow;
    this.patientview()
  }
  locationfetch() {
    const queryParams = {
      "type": "Location"
    }
    this.angulardbsvc.fetchDataUsingFind('project_db', queryParams, ['type', 'location', '_id']).subscribe((res: any) => {
      console.log(res)
      this.locationList = res.docs
      console.log("Location Details", this.locationList)
    })
  }
  logoutClick() {
    this.angulardbsvc.logout();
    this.toastr.success("Logouted Successfully")
  }
  volunteerfetch() {
    const queryParam = {
      "type": "Volunteer"
    }

    this.angulardbsvc.fetchDataUsingFind('project_db', queryParam, ['type', 'first_name', '_id']).subscribe((resp: any) => {
      console.log(resp)
      this.volunteerList = resp.docs;
      console.log("volunteer Details", this.volunteerList)
    })
  }
  // function to assign value in radio button
  changeGender() {
    return this.details.gender;
  }


  ngOnInit(): void {

    this.patientForm = this.fb.group({
      f_name: ['', [Validators.required, Validators.minLength(3)]],
      l_name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required]],
      location: [''],
      gender: ['', [Validators.required]],
      bloodgroup: ['', [Validators.required]],
      aadhar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      phone_number: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      email: ['', [Validators.required]],
      disorder: ['', [Validators.required, Validators.minLength(3)]],
      listofvolunteer: [''],
      type: ['Patient'],
      Login: this.id

    });
    this.userData = JSON.parse(localStorage.getItem('usrData') || '{}')
    this.userId = this.userData
    this.id = this.userId._id;
    console.log(this.id)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }
  // function call to post data in couch db
  patientDetailSubmission() {
    console.log(this.patientForm.value);
    this.angulardbsvc.postDetails(this.patientForm.value).subscribe((datas) => {
      console.log("Success", datas);
      this.patientForm.reset();
      this.toastr.success("Form Submitted Successfully")
    },
      err => {
        this.toastr.error("Form Failed to Submit");
        console.log(err);

      }
    );
  }
  patientview() {

    this.angulardbsvc.viewDocumentFetch("Patient").subscribe((datas: any) => {
      console.log("Patient Details", datas)
      this.patientdetail = datas.rows;
      this.patientRecord = this.patientdetail.map((el: any) => el.doc);

      this.lookupIdArray = lodash.uniq(this.patientRecord.map((el: any) => el['listofvolunteer']))
      this.angulardbsvc.getAll(this.lookupIdArray).subscribe((res: any) => {
        const volunteerlookup = res.rows.map((el: { doc: any; }) => el.doc)
        this.patientRecord.forEach((element: any) => {
          const volunteername = volunteerlookup.filter((el: any) => el['_id'] === element['listofvolunteer'])[0]
          element['Volunteer'] = volunteername['first_name']
        });
        console.log(res)
      })
    },
      err => {
        this.toastr.error("Failed to Display list of patient inan organisation");
        console.log(err);
      });
  }

  // function call to get data which has type Patient
  patientdata() {

    this.angulardbsvc.alldata("Patient").subscribe((datas: any) => {
      console.log("Patient Details", datas)
      this.details = datas.docs;
      this.patientallRecord = this.details;
      this.details = datas['rows'];

      this.lookupIdArray = lodash.uniq(this.patientallRecord.map((el: any) => el['listofvolunteer']))
      this.angulardbsvc.getAll(this.lookupIdArray).subscribe((res: any) => {
        const volunteerlookup = res.rows.map((el: { doc: any; }) => el.doc)
        this.patientallRecord.forEach((element: any) => {
          const volunteername = volunteerlookup.filter((el: any) => el['_id'] === element['listofvolunteer'])[0]
          element['Volunteer'] = volunteername['first_name']
        });
        console.log(res)
      })
    },
      err => {
        this.toastr.error("Failed to display list of patient in our Organisation");
        console.log(err);
      });
  }
}



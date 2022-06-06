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
  patientForm: FormGroup;
  patientRecord: any = [];
  details: any = {
    f_name: '',
    l_name: '',
    dob: '',
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

  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, public http: HttpClient, private toastr: ToastrService) {
    //getting the parent id from localStorage
    this.userData = JSON.parse(localStorage.getItem('usrData') || '{}')
    this.userId = this.userData
    this.id = this.userId._id;
    console.log(this.id)

    this.patientForm = this.fb.group({
      f_name: [this.details.f_name],
      l_name: [this.details.l_name],
      dob: [this.details.dob],
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
    if (this.isHide == false) {
      this.patient();
    }
  }
  toggleShow() {

    this.isShown = !this.isShown;
    this.isHide = !this.isHide;

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
      dob: ['', [Validators.required]],
      age: ['', [Validators.required]],
      location: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      bloodgroup: ['', [Validators.required]],
      aadhar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      phone_number: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      email: ['', [Validators.required]],
      disorder: ['', [Validators.required, Validators.minLength(3)]],
      listofvolunteer: ['', [Validators.required]],
      type: ['Patient'],
      Login: this.id

    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }
  // function call to post data in couch db
  submit() {
    console.log("User Id", this.id)
    console.log(this.patientForm.value);
    try {
      this.angulardbsvc.postDetails(this.patientForm.value).subscribe((datas) => {
        console.log("Success", datas);
        this.patientForm.reset();
        this.toastr.success("Form Submitted Successfully");

      });
    }
    catch (err: any) {
      this.toastr.error("Form Failed to Submit", err.name);

    }
  }
  // function call to get data which has type Patient
  patient() {

    this.angulardbsvc.details("Patient").subscribe((datas: any) => {
      console.log("Patient Details", datas)
      this.details = datas.docs;
      this.patientRecord = this.details;
      this.details = datas['rows'];
      console.log(this.details)
      this.lookupIdArray = lodash.uniq(this.patientRecord.map((el: any) => el['listofvolunteer']))
      this.angulardbsvc.getAll(this.lookupIdArray).subscribe((res: any) => {
        const volunteerlookup = res.rows.map((el: { doc: any; }) => el.doc)
        this.patientRecord.forEach((element: any) => {
          const volunteername = volunteerlookup.filter((el: any) => el['_id'] === element['listofvolunteer'])[0]
          element['Volunteer'] = volunteername['first_name']
        });
        console.log(res)
      })
    }, rej => {
      this.toastr.error("Form Failed to Found", rej);
      console.log(rej)
    });
  }
}



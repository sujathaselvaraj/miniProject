import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient-detail-update',
  templateUrl: './patient-detail-update.component.html',
  styleUrls: ['./patient-detail-update.component.css']
})
export class PatientDetailUpdateComponent implements OnInit {
  volunteerList: any = [''];
  volunteerRecord: any = {
    volunteer: ''
  }

  bloodGroup: any = ['A+ve', 'A1+ve', 'A1B+ve', 'B+ve', 'O+ve', 'AB+ve', 'A-ve', 'A1-ve', 'A1B-ve', 'B-ve', 'O-ve', 'AB-ve']

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
    phone_number: '',
    email: '',
    disorder: '',
    volunteer: '',
    helper_name: '',
    type: '',
    Login: ''
  }
  userData: any;
  userId: any;
  id: any;


  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, public http: HttpClient) {
    //getting the parent id from localStorage

    this.userData = JSON.parse(localStorage.getItem('usrData') || '{}')
    this.userId = this.userData
    this.id = this.userId._id;
    console.log(this.id)
    const queryParam = {
      "type": "Volunteer"
    }
    angulardbsvc.fetchDataUsing('project_db', queryParam, ['type', 'first_name', '_id']).subscribe((res: any) => {
      console.log(res)
      this.volunteerList = res.docs;
      console.log("volunteer Details", this.volunteerList)
    })
    this.patientForm = this.fb.group({
      f_name: [this.details.f_name],
      l_name: [this.details.l_name],
      dob: [this.details.dob],
      age: [this.details.age],
      gender: [this.details.gender],
      bloodgroup: [this.details.bloodGroup],
      aadhar: [this.details.aadhar],
      phone_number: [this.details.phone_number],
      email: [this.details.email],
      disorder: [this.details.disorder],
      volunteer: [this.volunteerRecord._id],

      // helper_name: [this.details.helper_name],
      type: [this.details.disorder],
      Login: [this.id]

    })
  }
  // function to assign value in radio button
  changeGender() {
    return this.details.gender;
  }
  // function to assign value in radio button
  // bloodgroup() {
  //   return this.details.bloodGroup;
  // }


  ngOnInit(): void {

    this.patientForm = this.fb.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      bloodgroup: ['', [Validators.required]],
      aadhar: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      disorder: ['', [Validators.required]],
      volunteer: [''],
      helper_name: ['Not yet get Help'],
      type: ['Patient'],
      Login: this.id

    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.details.controls;
  }
  // function call to post data in couch db
  submit() {
    console.log("User Id", this.id)
    console.log(this.patientForm.value);

    this.angulardbsvc.postDetails(this.patientForm.value, "project_db").subscribe((datas) => {
      console.log(datas)
      console.log("Success", datas);
      console.log(this.patientForm.value.bloodgroup)
    });
  }
  // function call to get data which has type Patient
  patient() {

    this.angulardbsvc.patientDetails("project_db").subscribe((datas: any) => {
      console.log("Patient Details", datas)
      this.details = datas.docs;
      this.patientRecord = this.details;
    });

  }
}



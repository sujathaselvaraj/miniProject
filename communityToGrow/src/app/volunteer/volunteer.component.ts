import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {


  userData: any;
  userId: any;
  id: any;
  volunteerform: FormGroup;
  volunteerRecord: any = [];
  volunteerdetails: any = {
    first_name: '',
    last_name: '',
    gender: '',
    aadhar: '',
    emailId: '',
    mobileNo: '',
    type: '',
    Login: '',
    job: '',
    volunteerList: ''
  }
  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, private http: HttpClient) {
    // Getting parent Id from Local Storage
    this.userData = JSON.parse(localStorage.getItem('usrData') || '{}')
    this.userId = this.userData;
    this.id = this.userId._id;
    console.log("Parent Id", this.id)

    this.volunteerform = this.fb.group({
      first_name: [this.volunteerdetails.first_name],
      last_name: [this.volunteerdetails.last_name],
      gender: [this.volunteerdetails.gender],
      aadhar: [this.volunteerdetails.aadhar],
      emailId: [this.volunteerdetails.emailId],
      mobileNo: [this.volunteerdetails.emailId],
      type: [this.volunteerdetails.type],
      job: [this.volunteerdetails.job],
      Login: [this.userId]

    })
  }
  // radio button value assigning
  genderSelection() {
    return this.volunteerform.value.gender;
  }
  ngOnInit(): void {
    this.volunteerform = this.fb.group({
      first_name: [
        '', [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      gender: ['', Validators.required], aadhar: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      emailId: ['', [Validators.required, Validators.email]],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11)
        ]
      ],
      type: ['Volunteer'],

      job: ['', [Validators.required]],
      Login: [this.userId]

    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.volunteerform.controls;
  }
  // function call to post data
  submit() {
    this.angulardbsvc.postDetails(this.volunteerform.value, "project_db").subscribe((data) => {
      console.log(data)
      console.log("Success");
      this.volunteerform.reset();
    });
  }
  // function call to display data
  volunteer() {
    this.angulardbsvc.volunteerDetails("project_db").subscribe((datas: any) => {
      console.log("Volunteer Details", datas)
      this.volunteerdetails = datas.docs;
      this.volunteerRecord = this.volunteerdetails;
    });

  }

}


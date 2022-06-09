import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  locationList: any = [''];

  isShown: boolean = true;
  isHide: boolean = false;
  isShow: boolean = false;

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
    location: '',
    job: '',
    volunteerList: ''
  }
  volunteerallRecord: any;
  constructor(private fb: FormBuilder, private toastr: ToastrService, public angulardbsvc: DaoserviceService, private http: HttpClient) {

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
      location: [this.locationList._id],
      type: [this.volunteerdetails.type],
      job: [this.volunteerdetails.job],
      Login: [this.id]
    })
    this.initialfetch();
    if (!this.isHide) {
      this.volunteerdata();
    };
    if (!this.isShow) {
      this.volunteerview();
    }

  }
  initialfetch() {
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
  toggleShown() {
    this.volunteerDetailSubmission();
  }

  toggleHide() {
    this.isShown = !this.isShown;
    this.isHide = !this.isHide;
    this.volunteerdata();
  }
  toggleShow() {

    this.isShown = !this.isShown;
    this.isShow = !this.isShow;
    this.volunteerview()
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
          Validators.minLength(3),
        ]
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      gender: ['', Validators.required],
      aadhar: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12)
        ]
      ],
      location: [''],

      emailId: ['', [Validators.required, Validators.email]],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.minLength(9)
        ]
      ],
      type: ['Volunteer'],
      job: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],

      Login: [this.id]

    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.volunteerform.controls;
  }
  // function call to post data
  volunteerDetailSubmission() {
    this.angulardbsvc.postDetails(this.volunteerform.value).subscribe((data) => {
      console.log(data);
      this.volunteerform.reset();
      this.toastr.success("Form Submitted Succesfully")

    },
      err => {
        this.toastr.error("Form Failed to Display");
        console.log(err);

      });
  }
  volunteerdata() {
    this.angulardbsvc.alldata("Volunteer").subscribe((datas: any) => {
      this.volunteerallRecord = datas.docs;
      console.log("Volunteer Details", this.volunteerallRecord)
    }, err => {
      this.toastr.error("Failed to Display all details of Volunteer");
      console.log(err);
    });
  }

  volunteerview() {
    this.angulardbsvc.viewDocumentFetch("Volunteer").subscribe((datas: any) => {
      console.log("Volunteer View", datas)
      this.volunteerdetails = datas.rows;
      this.volunteerRecord = this.volunteerdetails.map((el: any) => el.doc);
      console.log(this.volunteerRecord);
    }, err => {
      this.toastr.error("Failed to Display volunteer List of our Organisation");
      console.log(err);
    });

  }
}


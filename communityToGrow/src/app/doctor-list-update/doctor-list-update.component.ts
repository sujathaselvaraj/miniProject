import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-doctor-list-update',
  templateUrl: './doctor-list-update.component.html',
  styleUrls: ['./doctor-list-update.component.css']
})
export class DoctorListUpdateComponent implements OnInit {
  locationList: any = [''];

  userData: any;
  userId: any;
  id: any;
  isShown: boolean = true;
  isHide: boolean = false;
  isShow: boolean = false;


  doctorform: FormGroup;
  doctordetails: any = [];
  doctorRecord: any = {
    first_name: '',
    last_name: '',
    gender: '',
    emailId: '',
    mobileNo: '',
    type: '',
    Login: '',
    Location: '',
    education: {
      qualification: '',
      insti_name: '',
    },
    job: {
      desig: '',
      org_name: ''
    },

  }
  doctorallRecord: any;
  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, private http: HttpClient, private toastr: ToastrService) {

    // Getting parent Id from Local Storage
    this.userData = JSON.parse(localStorage.getItem('usrData') || '{}')
    this.userId = this.userData;
    this.id = this.userId._id;
    console.log("Parent Id", this.id)
    this.doctorform = this.fb.group({
      first_name: [this.doctorRecord.first_name],
      last_name: [this.doctorRecord.last_name],
      gender: [this.doctorRecord.gender],
      emailId: [this.doctorRecord.emailId],
      aadhar: [this.doctorRecord.aadhar],
      mobileNo: [this.doctorRecord.mobileNo],
      type: [this.doctorRecord.type],
      Location: [this.locationList._id],
      qualification: [this.doctorRecord.education.qualification],
      insti_name: [this.doctorRecord.education.insti_name],
      desig: [this.doctorRecord.job.desig],
      org_name: [this.doctorRecord.job.org_name],
      Login: [this.id]

    })
    this.initialfetch();
    if (!this.isHide) {
      this.doctordata();
    }
    if (!this.isShow) {
      this.doctorview();
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
  toggleShown() {
    this.doctorDetailSubmission();
  }

  toggleHide() {
    this.isShown = !this.isShown;
    this.isHide = !this.isHide;
    this.doctordata();
  }
  toggleShow() {

    this.isShown = !this.isShown;
    this.isShow = !this.isShow;
    this.doctorview()
  }
  // radio button value assigning
  genderSelection() {
    return this.doctorRecord.gender;
  }
  ngOnInit(): void {
    this.doctorform = this.fb.group({
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
      emailId: ['', [Validators.required, Validators.email]],
      aadhar: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12)
        ]
      ],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      type: ['Doctor'],
      Location: [''],
      qualification: ['', [Validators.required, Validators.minLength(2)]],
      insti_name: [
        '',
        [
          Validators.required, Validators.minLength(3)
        ]
      ],

      desig: ['', [Validators.required, Validators.minLength(2)]],

      org_name: ['', [Validators.required]],
      Login: this.id

    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.doctorform.controls;
  }
  //calling the function that in service  to post the data
  doctorDetailSubmission() {
    this.angulardbsvc.postDetails(this.doctorform.value).subscribe((data) => {
      console.log(data);
      this.toastr.success("Form Submitted successfully")
      this.doctorform.reset();
    },
      err => {
        this.toastr.error("Form Failed to submit");
        console.log(err);
      });

  }
  logoutClick() {
    this.angulardbsvc.logout();
    this.toastr.success("Logout Successfully")
  }
  doctordata() {
    this.angulardbsvc.alldata("Doctor").subscribe((datas: any) => {
      this.doctorallRecord = datas.docs;
      console.log("Doctor Details", this.doctorallRecord)
    });
  }

  doctorview() {
    this.angulardbsvc.viewDocumentFetch('Doctor').subscribe((datas: any) => {
      this.doctorRecord = datas.rows;
      this.doctordetails = this.doctorRecord.map((el: any) => el.doc);
      console.log(this.doctorRecord, "view");
    },
      err => {
        this.toastr.error("Form Failed to view", err);

      });
  }
}




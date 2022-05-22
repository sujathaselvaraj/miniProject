import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NodeapiService } from '../nodeapi.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public angulardbsvc: DaoserviceService, public nodesvc: NodeapiService, private http: HttpClient) { }

  ngOnInit(): void {
  }
  myform = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    mobileno: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    dob: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl(),
    confirmPassword: new FormControl(),

  })
  get f() {
    return this.myform.controls;
  }
  submit() {
    console.log(this.myform.value)
    this.nodesvc.storedata(this.myform.value).subscribe((data: any) => {
      console.log("data returned from server", data);
    })
    // this.angulardbsvc.postDetails(this.myform.value, "doctor_details_db").subscribe((data) => {
    //   console.log(data)
    //   console.log("Success");
    // });
    // this.nodesvc.postDetails(this.myform.value, "signin_details.db").subscribe((data) => {
    //   console.log(data)
    //   console.log("Success");
    //   this.myform.reset();
    // });

  }

}

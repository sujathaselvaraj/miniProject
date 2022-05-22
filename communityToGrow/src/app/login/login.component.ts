import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { DaoserviceService } from '../daoservice.service';
// import { NodeapiService } from '../nodeapi.service';
import { NodeapiService } from '../nodeapi.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public nodesvc: NodeapiService) { }

  ngOnInit(): void {
  }
  myform = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),

  })
  get f() {
    return this.myform.controls;
  }
  submit() {
    console.log(this.myform.value)
    // this.angulardbsvc.postDetails(this.myform.value, "doctor_details_db").subscribe((data) => {
    //   console.log(data)
    //   console.log("Success");
    // });
    // this.nodesvc.postDetails(this.myform.value, "login_details_db").subscribe((data: any) => {
    //   console.log(data)
    //   console.log("Success");
    //   this.myform.reset();
    // });
    this.nodesvc.storedata(this.myform.value);
    this.nodesvc.login(this.myform.value);
  }

  // this.nodesvc.get("login_details_db").subscribe((data) => {
  //   console.log(data)
  //   console.log("Success");
  // });

}


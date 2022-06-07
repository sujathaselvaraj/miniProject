
import { Component, OnInit } from '@angular/core';
import { NodeapiService } from '../nodeapi.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginrecord: any = {
    aadhar: '',
    Password: '',
  };

  loginform: FormGroup;
  constructor(private fb: FormBuilder, private api: NodeapiService, private toastr: ToastrService, private router: Router) {

    this.loginform = this.fb.group({
      aadhar: [this.loginrecord.aadhar],
      Password: [this.loginrecord.Password],
    })
  }

  ngOnInit(): void {
    this.loginform = this.fb.group({

      aadhar: [''],
      Password: ['',],
    });
  }
  get aadhar() {
    return this.loginform.get('aadhar')!;
  }
  get Password() {
    return this.loginform.get('Password')!;
  }
  login(Formvalue: any) {
    this.api.test_get(Formvalue.aadhar).subscribe((data) => {
      console.log("data returned from server", data);
      const loginData = { data: JSON.stringify(data.docs[0]) }
      localStorage.setItem('usrData', JSON.stringify(data.docs[0]))

      if (data.docs.length <= 0) {
        this.toastr.error("Please Register");
        this.router.navigate(['/signUp']);

      }
      if (data.docs[0].aadhar === Formvalue.aadhar) {
        if (data.docs[0].Password === Formvalue.Password) {

          this.router.navigate(['/who_we_are'], {
            queryParams: loginData
          });

          this.toastr.success("Login Successfully");
        }
        else {
          this.toastr.error("Enter Correct Password ")
        }
      }
      else {
        this.toastr.error("Please Register");
        this.router.navigate(['/signUp']);

      }
    },
      err => {
        this.toastr.error("Failed to Login", err);
      });

  }
}
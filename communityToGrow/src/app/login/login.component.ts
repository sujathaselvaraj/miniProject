
import { Component, OnInit } from '@angular/core';
import { NodeapiService } from '../nodeapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      aadhar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
  }
  get aadhar() {
    return this.loginform.get('aadhar')!;
  }
  get Password() {
    return this.loginform.get('Password')!;
  }
  login(Formvalue: any) {
    this.api.check_get(Formvalue.aadhar).subscribe((data) => {
      console.log("data returned from server", data);
      localStorage.setItem('usrData', JSON.stringify(data.docs[0]))

      if (data.docs.length <= 0) {
        this.toastr.error("Please Register");
      }
      if (data.docs[0].aadhar === Formvalue.aadhar) {
        if (data.docs[0].Password === Formvalue.Password) {

          this.router.navigate(['/who_we_are']);

          this.toastr.success("Login Successfully");
        }
        else {
          this.toastr.error("Enter Correct Password ")
        }
      }
      else {
        this.toastr.error("Please Register");

      }
    },
      err => {
        console.log(err);
        this.toastr.error("Failed to Login");
      });

  }

}
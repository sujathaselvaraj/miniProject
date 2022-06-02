
import { Component, OnInit } from '@angular/core';
import { NodeapiService } from '../nodeapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  previousDataObject: any;


  loginrecord: any = {
    aadhar: '',
    Password: '',
    type: ''
  };

  loginform: FormGroup;
  constructor(private fb: FormBuilder, private api: NodeapiService, private toastr: ToastrService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(res => {
      console.log("User Data", res)
      this.previousDataObject = res

    })
    this.loginform = this.fb.group({
      aadhar: [this.loginrecord.aadhar],
      Password: [this.loginrecord.Password],
      type: []
    })
  }

  ngOnInit(): void {
    this.loginform = this.fb.group({

      aadhar: [''],
      Password: ['', [Validators.minLength(8)]],
      type: ['Entry']
    });
  }
  get aadhar() {
    return this.loginform.get('aadhar')!;
  }
  get Password() {
    return this.loginform.get('Password')!;
  }
  login(Formvalue: any) {
    // console.log(Formvalue.aadhar);
    this.api.test_get(Formvalue.aadhar).subscribe((data) => {
      console.log("data returned from server", data);
      const loginData = { response: JSON.stringify(data.docs[0]) }
      // if (data.docs[0].aadhar != Formvalue.aadhar) {
      //   this.toastr.error("Please Register")
      // }
      if (data.docs.length <= 0) {
        this.toastr.error("Please Register");
      }
      if (data.docs[0].aadhar === Formvalue.aadhar) {
        if (data.docs[0].Password === Formvalue.Password) {

          localStorage.setItem('usrData', JSON.stringify(data.docs[0]))
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


      // if (data.docs[0].aadhar !== Formvalue.aadhar) {
      //   this.router.navigate(['/signUp']);

      //   alert("Please Register");
      // }
    })

  }
}
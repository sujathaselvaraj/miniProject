import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import Validation from './utils/validation';
import { DaoserviceService } from '../daoservice.service';
import { NodeapiService } from '../nodeapi.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {
  checkout: FormGroup;
  userRecord: any = {
    fullName: '',
    aadhar: '',
    emailId: '',
    Password: '',
    Confirmpassword: '',
    type: ''

  };

  constructor(private fb: FormBuilder, private toastr: ToastrService, public angulardbsvc: DaoserviceService, public nodesvc: NodeapiService, private http: HttpClient, private router: Router) {

    this.checkout = this.fb.group({
      fullName: [this.userRecord.fullname],
      aadhar: [this.userRecord.aadhar],
      emailId: [this.userRecord.emailId],
      Password: [this.userRecord.Password],
      Confirmpassword: [this.userRecord.Confirmpassword],
      type: 'Login',


    });
  }

  ngOnInit(): void {
    this.checkout = this.fb.group(
      {
        fullname: ['', Validators.required],
        aadhar: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(12)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        type: ['Login'],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.checkout.controls;
  }
  onSubmit(Formvalue: any): void {
    this.nodesvc.storedata(Formvalue).subscribe((data: any) => {
      console.log("data returned from server", data);
      this.router.navigate(['/']);

    },
      err => {
        this.toastr.error("Data Failed to return from Server", err)
      })

    if (this.checkout.valid) {
      this.toastr.success("Form Submitted Successfully");


      return;
    }
    console.log(JSON.stringify(this.checkout.value, null, 2));

  }

}

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
    ConfirmPassword: '',
    type: ''

  };

  constructor(private fb: FormBuilder, private toastr: ToastrService, public angulardbsvc: DaoserviceService, public nodesvc: NodeapiService, private http: HttpClient, private router: Router) {

    this.checkout = this.fb.group({
      fullName: [this.userRecord.fullName],
      aadhar: [this.userRecord.aadhar],
      emailId: [this.userRecord.emailId],
      Password: [this.userRecord.Password],
      ConfirmPassword: [this.userRecord.ConfirmPassword],
      type: 'Login',


    });
  }

  ngOnInit(): void {
    this.checkout = this.fb.group(
      {
        fullName: ['', Validators.required],
        aadhar: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(12)
          ]
        ],
        emailId: ['', [Validators.required, Validators.email]],
        type: ['Login'],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        ConfirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('Password', 'ConfirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.checkout.controls;
  }
  checkForValidity() {
    const aadharValue = this.checkout.value['aadhar']
    const query = {
      'aadhar': aadharValue,
      'type': 'Login'
    }
    this.angulardbsvc.aadharValidation(query).subscribe((resp: any) => {
      console.log(resp)
      if (resp.docs.length >= 1) {
        this.toastr.error("Aadhar already exist.Please use another");
      }
    }, err => {
      console.error(err)
    })
  }
  onSubmit(Formvalue: any): void {
    this.nodesvc.storedata(Formvalue).subscribe((data: any) => {
      console.log("data returned from server", data);
      this.toastr.success("Form Submitted Successfully")
      this.router.navigate(['/']);
    },
      err => {
        this.toastr.error("Form Failed to submit");
        console.log(err);
      })
  }

}

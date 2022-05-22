import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import Validation from './utils/validation';
import { DaoserviceService } from '../daoservice.service';
import { NodeapiService } from '../nodeapi.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {
  checkout: FormGroup;
  submitted = false;
  userRecord: any = {
    fullName: '',
    Username: '',
    emailId: '',
    Password: '',
    Confirmpassword: '',

  };
  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, public nodesvc: NodeapiService, private http: HttpClient) {

    this.checkout = this.fb.group({
      fullName: [this.userRecord.fullname],
      Username: [this.userRecord.username],
      emailId: [this.userRecord.emailId],
      Password: [this.userRecord.Password],
      Confirmpassword: [this.userRecord.Confirmpassword],


    });
  }

  ngOnInit(): void {
    this.checkout = this.fb.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
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
    console.log("from form", Formvalue);
    this.nodesvc.storedata(Formvalue).subscribe((data: any) => {
      console.log("data returned from server", data);
    })
    this.submitted = true;
    if (this.checkout.invalid) {
      return;
    }
    console.log(JSON.stringify(this.checkout.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.checkout.reset();
  }

}

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
  submitted = true;
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
      type: [],


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
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        type: ['Login'],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
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
    console.log("from form", Formvalue);
    this.nodesvc.storedata(Formvalue).subscribe((data: any) => {
      console.log("data returned from server", data);
    })
    this.submitted = true;
    if (this.checkout.valid) {
      this.toastr.success("Form Submitted Successfully");

      this.router.navigate(['/who_we_are']);

      return;
    }
    console.log(JSON.stringify(this.checkout.value, null, 2));

  }

}

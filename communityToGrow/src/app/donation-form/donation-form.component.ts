import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
// import { DaoserviceService } from '../daoservice.service'
// import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {
  other: any;

  constructor(public angulardbsvc: DaoserviceService) {
  }


  // get f() {
  //   return this.form.controls;
  // }

  // submit() {
  //   console.log(this.form.value);
  // }

  changeFund() {
    return this.form.value.gender;
  }
  otherFund() {
    return this.form.value.otherFund;
  }
  changeDonationType() {
    return this.form.value.donationType;
  }
  changeFrequency() {
    return this.form.value.frequency;
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented')
    console.log("It's Working");
  }
  display() {
    return this.form.value.typeOfTribute;
  }
  genderSelection() {
    return this.form.value.gender;
  }
  confirmation() {
    return this.form.value.confirmation;
  }
  form = new FormGroup({
    fund: new FormControl(),
    fundOther: new FormControl(),
    donationType: new FormControl(),
    frequency: new FormControl(),
    instructions: new FormControl('', [Validators.required, Validators.minLength(20)]),
    typeOfTribute: new FormControl(),
    tribute: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl(),
    temporaryAddress: new FormControl('', [Validators.required, Validators.minLength(30)]),
    permanentAddress: new FormControl('', [Validators.required, Validators.minLength(30)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl('', [Validators.required, Validators.minLength(3)]),
    zip: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactfname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contactlname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contacttemporaryAddress: new FormControl('', [Validators.required, Validators.minLength(30)]),
    contactpermanentAddress: new FormControl('', [Validators.required, Validators.minLength(30)]),
    mobileno: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    contactcity: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contactstate: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contactzip: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    contactemail: new FormControl('', [Validators.required, Validators.email]),
    contactmobileno: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    confirmation: new FormControl(),
    cardholdername: new FormControl(),
    cardAccountNumber: new FormControl(),
    accountNumber: new FormControl(),
    expirationDate: new FormControl(),
    securityCode: new FormControl(),
    // billingAddressIsSame: new FormControl(),
    billingAddress: new FormControl(),
    billingCity: new FormControl(),
    billingState: new FormControl(),
    billingZip: new FormControl(),
    billingEmail: new FormControl()
  })
  get f() {
    return this.form.controls;
  }
  submit() {
    this.angulardbsvc.postDetails(this.form.value, "donation_details_db").subscribe((data) => {
      console.log(data)
      console.log("Success");
      this.form.reset();
    });
  }



  // createNewData(formValue: any) {
  //   this.apiService.addData(formValue).subscribe((data: {}) => {
  //     console.log(data);
  //   });
  // }

}

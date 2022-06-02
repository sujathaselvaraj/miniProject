import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {
  donationform!: FormGroup;
  donationDetail: any = {
    fund: '',
    fundOther: '',
    frequency: '',
    instructions: '',
    typeOfTribute: '',
    tribute: '',
    fname: '',
    lname: '',
    gender: '',
    paymentRecord: {
      cardholdername: '',
      cardNumber: '',
      accountNumber: '',
      expirationDate: ''
    }
  };

  constructor(private fb: FormBuilder, private toastr: ToastrService, public angulardbsvc: DaoserviceService, private http: HttpClient) {
    this.donationform = this.fb.group({
      fund: [this.donationDetail.fund],
      fundOther: [this.donationDetail.fundOther],
      frequency: [this.donationDetail.frequency],
      instructions: [this.donationDetail.instructions],
      typeOfTribute: [this.donationDetail.typeOfTribute],
      tribute: [this.donationDetail.tribute],
      fname: [this.donationDetail.fname],
      lname: [this.donationDetail.lname],
      gender: [this.donationDetail.gender],
      cardholdername: [this.donationDetail.paymentRecord.cardholdername],
      cardNumber: [this.donationDetail.paymentRecord.cardNumber],
      accountNumber: [this.donationDetail.paymentRecord.accountNumber],
      expirationDate: [this.donationDetail.paymentRecord.expirationDate]
    });
  }

  typeofTribute() {
    return this.donationform.value.typeOfTribute;
  }

  changeFund() {
    return this.donationform.value.gender;
  }
  otherFund() {
    return this.donationform.value.otherFund;
  }
  changeDonationType() {
    return this.donationform.value.donationType;
  }
  changeFrequency() {
    return this.donationform.value.frequency;
  }
  confirmation() {
    return this.donationform.value.confirmation;
  }
  display() {
    return this.donationform.value.typeOfTribute;
  }
  genderSelection() {
    return this.donationform.value.gender;
  }


  ngOnInit(): void {
    this.donationform = this.fb.group({
      fund: [''],
      fundOther: [''],
      frequency: [''],
      instructions: ['', [Validators.required, Validators.minLength(3)]],
      typeOfTribute: [''],
      tribute: [''],
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      gender: [''],
      cardholdername: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      accountNumber: ['', [Validators.required, Validators.minLength(12)]],
      expirationDate: ['']
    })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.donationform.controls;
  }
  submit() {
    console.log(this.donationform.value)
    this.angulardbsvc.postDetails(this.donationform.value).subscribe((data) => {
      console.log(data)
      console.log("Success");
      this.donationform.reset();
      this.toastr.success("Form Submitted Successfully");

    });
  }
}

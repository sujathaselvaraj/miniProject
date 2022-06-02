import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { NodeapiService } from '../nodeapi.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-paymentdetils',
  templateUrl: './paymentdetils.component.html',
  styleUrls: ['./paymentdetils.component.css']
})
export class PaymentdetilsComponent implements OnInit {
  bankdetail: FormGroup;
  paymentRecord: any = {
    cardholdername: '',
    cardNumber: '',
    accountNumber: '',
    expirationDate: ''
  };

  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, public nodesvc: NodeapiService, private http: HttpClient) {
    this.bankdetail = this.fb.group({
      cardholdername: [this.paymentRecord.cardholdername],
      cardNumber: [this.paymentRecord.cardNumber],
      accountNumber: [this.paymentRecord.accountNumber],
      expirationDate: [this.paymentRecord.expirationDate]
    });
  }


  ngOnInit(): void {
    this.bankdetail = this.fb.group(
      {
        cardholdername: ['', [Validators.required, Validators.minLength(3)]],
        cardNumber: ['', [Validators.required, Validators.minLength(16)]],
        accountNumber: ['', [Validators.required, Validators.minLength(12)]],
        expirationDate: ['']

      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.bankdetail.controls;
  }
  submit() {
    console.log(this.bankdetail.value)
    this.angulardbsvc.postDetails(this.bankdetail.value).subscribe((data) => {
      console.log(data)
      console.log("Success");
      this.bankdetail.reset();
    })
  }
}

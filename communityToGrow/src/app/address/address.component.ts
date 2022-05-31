import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  myform: FormGroup;
  array: any = [];
  address: any = {
    aadhar: '',
    temporaryAddress: '',
    permanentAddress: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    type: ''
  }
  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, private http: HttpClient) {
    this.myform = this.fb.group({
      aadhar: [this.address.aadhar],
      temporaryAddress: [this.address.temporaryAddress],
      permanentAddress: [this.address.permanentAddress],
      city: [this.address.city],
      state: [this.address.state],
      zip: [this.address.zip],
      email: [this.address.email],
      type: [this.address.type]
    });
  }
  ngOnInit(): void {
    this.myform = this.fb.group({

      aadhar: ['', [Validators.required, Validators.minLength(12)]],
      temporaryAddress: ['', [Validators.required, Validators.minLength(3)]],
      permanentAddress: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      state: ['', [Validators.required, Validators.minLength(3)]],
      zip: ['', [Validators.required, Validators.maxLength(6)]],
      email: [''],
      type: ['Address']
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myform.controls;
  }
  // calling the function that in service to post the data
  submit() {
    console.log(this.myform.value)
    this.angulardbsvc.postDetails(this.myform.value, "project_db").subscribe((data) => {
      console.log(data)
      console.log("Success");
      this.myform.reset();
    })
  }
  // calling the function  that in service to get the data in db
  onDisplay() {
    this.angulardbsvc.getAllDetails("project_db").subscribe((datas: any) => {
      console.log("running", datas)
      this.address = datas;
      this.address = this.address.rows;
      this.array = this.address.map((x: any) => x.doc);
    });

  }
}

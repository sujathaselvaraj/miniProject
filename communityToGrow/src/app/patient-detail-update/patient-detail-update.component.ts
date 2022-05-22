import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';

@Component({
  selector: 'app-patient-detail-update',
  templateUrl: './patient-detail-update.component.html',
  styleUrls: ['./patient-detail-update.component.css']
})
export class PatientDetailUpdateComponent implements OnInit {

  constructor(public angulardbsvc: DaoserviceService) { }
  changeGender() {
    return this.myform.value.gender;
  }
  changeProfession() {
    return this.myform.value.profession;
  }
  bloodgroup() {
    return this.myform.value.bloodGroup;
  }
  changeroom() {
    return this.myform.value.roomchoice;
  }
  changegame() {
    return this.myform.value.game;
  }
  changeOthers() {
    return this.myform.value.others;
  }
  ngOnInit(): void {
  }
  myform = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    middle_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dob: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
    profession: new FormControl(),
    bloodGroup: new FormControl(),
    phone_number: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    presentStreet_number: new FormControl('', [Validators.required, Validators.minLength(2)]),
    presentStreet_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    presentArea: new FormControl('', [Validators.required, Validators.minLength(3)]),
    presentDistrict: new FormControl('', [Validators.required, Validators.minLength(3)]),
    presentPostal_number: new FormControl('', [Validators.required, Validators.minLength(3)]),
    permanentStreet_number: new FormControl('', [Validators.required, Validators.minLength(3)]),
    permanentStreet_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    permanentArea: new FormControl('', [Validators.required, Validators.minLength(3)]),
    permanentDistrict: new FormControl('', [Validators.required, Validators.minLength(3)]),
    permanentPostal_number: new FormControl('', [Validators.required, Validators.minLength(6)]),
    roomchoice: new FormControl(),
    disease: new FormControl(),
    comments: new FormControl(),
    height: new FormControl(),
    weight: new FormControl(),
    disease_1: new FormControl('', [Validators.required, Validators.minLength(3)]),
    disease_2: new FormControl(),
    disease_3: new FormControl(),
    disease_4: new FormControl(),
    disease_5: new FormControl(),
    disease_6: new FormControl(),
    upper: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lower: new FormControl('', [Validators.required, Validators.minLength(2)]),
    breakf_1: new FormControl('', [Validators.required, Validators.minLength(3)]),
    breakf_2: new FormControl(),
    breakf_3: new FormControl(),
    lunch_1: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lunch_2: new FormControl(),
    lunch_3: new FormControl(),
    dinner_1: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dinner_2: new FormControl(),
    dinner_3: new FormControl(),
    game: new FormControl(),
    others: new FormControl(),


  })
  get f() {
    return this.myform.controls;
  }
  submit() {
    this.angulardbsvc.postDetails(this.myform.value, "patient_details_db").subscribe((data) => {
      console.log(data)
      console.log("Success");
      this.myform.reset();
    });
    // console.log(this.myform.value)


  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';

@Component({
  selector: 'app-doctor-list-update',
  templateUrl: './doctor-list-update.component.html',
  styleUrls: ['./doctor-list-update.component.css']
})
export class DoctorListUpdateComponent implements OnInit {

  constructor(public donationsvc: DaoserviceService) { }
  genderSelection() {
    return this.myform.value.gender;
  }
  ngOnInit(): void {
  }
  myform = new FormGroup({
    first_name: new FormControl(),
    middle_name: new FormControl(),
    last_name: new FormControl(),
    ssc_inst_name: new FormControl(),
    ssc_year: new FormControl(),
    ssc_cgpa: new FormControl(),
    ssc_position: new FormControl(),
    hsc_inst_name: new FormControl(),
    hsc_year: new FormControl(),
    hsc_cgpa: new FormControl(),
    hsc_position: new FormControl(),
    mbbs_inst_name: new FormControl(),
    mbbs_year: new FormControl(),
    mbbs_cgpa: new FormControl(),
    mbbs_position: new FormControl(),
    inst_name: new FormControl(),
    year: new FormControl(),
    cgpa: new FormControl(),
    position: new FormControl(),
    job_desg1: new FormControl(),
    from_date1: new FormControl(),
    to_date1: new FormControl(),
    org_name1: new FormControl(),
    job_desg2: new FormControl(),
    from_date2: new FormControl(),
    to_date2: new FormControl(),
    org_name2: new FormControl(),
    job_desg3: new FormControl(),
    from_date3: new FormControl(),
    to_date3: new FormControl(),
    org_name3: new FormControl(),
    job_desg4: new FormControl(),
    from_date4: new FormControl(),
    to_date4: new FormControl(),
    org_name4: new FormControl(),
    job_desg5: new FormControl(),
    from_date5: new FormControl(),
    to_date5: new FormControl(),
    org_name5: new FormControl()


  })
  get f() {
    return this.myform.controls;
  }
  submit() {
    this.donationsvc.postDetails(this.myform.value, "doctor_details_db").subscribe((data) => {
      console.log(data)
      console.log("Success");
      this.myform.reset();
    });

  }
}

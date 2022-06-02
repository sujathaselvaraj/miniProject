import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locationForm: FormGroup;

  // locationList: any = ['Tamil Nadu', 'Kerala', 'Punjab', 'Mumbai', 'New Delhi', 'Rajastan', 'Gujarat', 'Andhra Pradesh'];
  locationList: any = ['']
  locationRecord: any = {
    location: '',
    type: ''

  }

  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, public http: HttpClient) {
    const queryParams = {
      "type": "Location"
    }
    angulardbsvc.fetchDataUsingFind('project_db', queryParams, ['type', 'location', '_id']).subscribe((res: any) => {
      console.log(res)
      this.locationList = res.docs
      console.log("Location Details", this.locationList)
    })

    this.locationForm = this.fb.group({
      location: [this.locationRecord.location],
      type: []
    });
  }
  ngOnInit(): void {
    this.locationForm = this.fb.group({
      location: ['', Validators.required],
      type: ['Location']
    });

  }

  get f() {
    return this.locationForm.controls;
  }

  submit() {

    console.log(this.locationForm.value);
    this.angulardbsvc.postDetails(this.locationForm.value).subscribe((datas: any) => {
      console.log(datas)
      console.log("Success", datas);

    });
  }
}

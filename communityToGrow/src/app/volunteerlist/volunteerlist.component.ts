import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DaoserviceService } from '../daoservice.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-volunteerlist',
  templateUrl: './volunteerlist.component.html',
  styleUrls: ['./volunteerlist.component.css']
})
export class VolunteerlistComponent implements OnInit {
  // volunteerList: any = ['ItSolutionStuff.com', 'HDTuto.com', 'Nicesnippets.com']
  volunteerList: any = [''];
  volunteerRecord: any = {
    volunteer: '',
    type: ''
  }
  volunteerForm: FormGroup;
  constructor(private fb: FormBuilder, public angulardbsvc: DaoserviceService, public http: HttpClient) {
    const queryParams = {
      "type": "Volunteer"
    }
    angulardbsvc.fetchDataUsingFind('project_db', queryParams, ['type', 'first_name', '_id']).subscribe((res: any) => {
      console.log(res)
      this.volunteerList = res.docs;
      console.log("volunteer Details", this.volunteerList)
    })

    this.volunteerForm = this.fb.group({
      volunteer: [this.volunteerRecord.volunteer],
      type: []
    });
  }
  ngOnInit(): void {
    this.volunteerForm = this.fb.group({
      volunteer: ['', Validators.required],
      type: ['Volunteer']
    });

  }

  get f() {
    return this.volunteerForm.controls;
  }

  submit() {

    console.log(this.volunteerForm.value);
    this.angulardbsvc.postDetails(this.volunteerForm.value).subscribe((datas: any) => {
      console.log(datas)
      console.log("Success", datas);

    });
  }
}

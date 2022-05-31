import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DaoserviceService } from '../daoservice.service';
@Component({
  selector: 'app-stay-connected',
  templateUrl: './stay-connected.component.html',
  styleUrls: ['./stay-connected.component.css']
})
export class StayConnectedComponent implements OnInit {
  details: any = [];
  constructor(public angulardbsvc: DaoserviceService, private http: HttpClient) { }

  ngOnInit(): void {
  }
}

import { Component } from '@angular/core';
import { DaoserviceService } from '../daoservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(public angulardbsvc: DaoserviceService, public toastr: ToastrService) { }
  logoutClick() {
    this.angulardbsvc.logout();
    this.toastr.success("Logouted Successfully")
  }
}


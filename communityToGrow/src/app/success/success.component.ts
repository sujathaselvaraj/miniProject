import { Component } from '@angular/core';
import { DaoserviceService } from '../daoservice.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  constructor(public angulardbsvc: DaoserviceService, public toastr: ToastrService) { }
  logoutClick() {
    this.angulardbsvc.logout();
    this.toastr.success("Logouted Successfully")
  }
}

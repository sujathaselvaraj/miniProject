import { Component } from '@angular/core';
import { DaoserviceService } from '../daoservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-stay-connected',
  templateUrl: './stay-connected.component.html',
  styleUrls: ['./stay-connected.component.css']
})
export class StayConnectedComponent {
  constructor(public angulardbsvc: DaoserviceService, public toastr: ToastrService) { }
  logoutClick() {
    this.angulardbsvc.logout();
    this.toastr.success("Logouted Successfully")
  }
}

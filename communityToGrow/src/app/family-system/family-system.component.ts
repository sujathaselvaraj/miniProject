import { Component } from '@angular/core';
import { DaoserviceService } from '../daoservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-family-system',
  templateUrl: './family-system.component.html',
  styleUrls: ['./family-system.component.css']
})
export class FamilySystemComponent {
  constructor(public angulardbsvc: DaoserviceService, public toastr: ToastrService) { }
  logoutClick() {
    this.angulardbsvc.logout();
    this.toastr.success("Logout Successfully")
  }
}

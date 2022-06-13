import { Component } from '@angular/core';
import { DaoserviceService } from '../daoservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-build-community',
  templateUrl: './build-community.component.html',
  styleUrls: ['./build-community.component.css']
})
export class BuildCommunityComponent {
  constructor(public angulardbsvc: DaoserviceService, public toastr: ToastrService) { }
  logoutClick() {
    this.angulardbsvc.logout();
    this.toastr.success("Logout Successfully")
  }
}

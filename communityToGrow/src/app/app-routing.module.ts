import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildCommunityComponent } from './build-community/build-community.component';
import { ContactComponent } from './contact/contact.component';
import { DoctorListUpdateComponent } from './doctor-list-update/doctor-list-update.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { FamilySystemComponent } from './family-system/family-system.component';
import { LoginComponent } from './login/login.component';
import { PatientDetailUpdateComponent } from './patient-detail-update/patient-detail-update.component';
import { SignupformComponent } from './signupform/signupform.component';
import { StayConnectedComponent } from './stay-connected/stay-connected.component';
import { SuccessComponent } from './success/success.component';
import { VolunteerComponent } from './volunteer/volunteer.component';

const routes: Routes = [{ path: 'oursuccess', component: SuccessComponent },
{ path: 'contact', component: ContactComponent },
{ path: 'donate', component: DonationFormComponent },
{ path: '', component: LoginComponent },
{ path: 'who_we_are', component: FamilySystemComponent },
{ path: 'signUp', component: SignupformComponent },
{ path: 'buildcommunity', component: BuildCommunityComponent },
{ path: 'stayConnected', component: StayConnectedComponent },
{ path: 'patient', component: PatientDetailUpdateComponent },
{ path: 'doctor', component: DoctorListUpdateComponent },
{ path: 'volunteer', component: VolunteerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

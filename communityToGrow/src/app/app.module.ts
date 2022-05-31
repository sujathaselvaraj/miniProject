import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FamilySystemComponent } from './family-system/family-system.component';
import { LogoComponent } from './logo/logo.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { DoctorListUpdateComponent } from './doctor-list-update/doctor-list-update.component';
import { PatientDetailUpdateComponent } from './patient-detail-update/patient-detail-update.component';
import { DaoserviceService } from './daoservice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NodeapiService } from './nodeapi.service';
import { SuccessComponent } from './success/success.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupformComponent } from './signupform/signupform.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { BuildCommunityComponent } from './build-community/build-community.component';
import { StayConnectedComponent } from './stay-connected/stay-connected.component';
import { AddressComponent } from './address/address.component';
import { PaymentdetilsComponent } from './paymentdetils/paymentdetils.component';
import { ConvertionPipe } from './convertion.pipe';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { LocationComponent } from './location/location.component';
import { HttpCallInterceptor } from './interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { VolunteerlistComponent } from './volunteerlist/volunteerlist.component';
const routes: Routes = [
  { path: 'oursuccess', component: SuccessComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'donate', component: DonationFormComponent },
  { path: '', component: LoginComponent },
  { path: 'who_we_are', component: FamilySystemComponent },
  { path: 'signUp', component: SignupformComponent },
  { path: 'buildcommunity', component: BuildCommunityComponent },
  { path: 'stayConnected', component: StayConnectedComponent },
  { path: 'payment', component: PaymentdetilsComponent },
  { path: 'patient', component: PatientDetailUpdateComponent },
  { path: 'doctor', component: DoctorListUpdateComponent },
  { path: 'volunteer', component: VolunteerComponent },


]
@NgModule({
  declarations: [
    AppComponent,
    FamilySystemComponent,
    LogoComponent,
    DonationFormComponent,
    DoctorListUpdateComponent,
    PatientDetailUpdateComponent,
    LoginComponent,
    SuccessComponent,
    SignupformComponent,
    MenuComponent,
    ContactComponent,
    BuildCommunityComponent,
    StayConnectedComponent,
    AddressComponent,
    PaymentdetilsComponent,
    ConvertionPipe,
    VolunteerComponent,
    LocationComponent,
    VolunteerlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCallInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }

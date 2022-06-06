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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupformComponent } from './signupform/signupform.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { BuildCommunityComponent } from './build-community/build-community.component';
import { StayConnectedComponent } from './stay-connected/stay-connected.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { LocationComponent } from './location/location.component';
import { HttpCallInterceptor } from './interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { VolunteerlistComponent } from './volunteerlist/volunteerlist.component';

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

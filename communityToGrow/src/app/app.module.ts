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
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { NodeapiService } from './nodeapi.service';
import { SuccessComponent } from './success/success.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupformComponent } from './signupform/signupform.component';
@NgModule({
  declarations: [
    AppComponent,
    FamilySystemComponent,
    LogoComponent,
    DonationFormComponent,
    DoctorListUpdateComponent,
    PatientDetailUpdateComponent,
    LoginComponent,
    SigninComponent,
    SuccessComponent,
    SignupformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NodeapiService, DaoserviceService
    // HttpClient
    // HttpModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

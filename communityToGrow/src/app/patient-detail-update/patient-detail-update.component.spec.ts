import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailUpdateComponent } from './patient-detail-update.component';

describe('PatientDetailUpdateComponent', () => {
  let component: PatientDetailUpdateComponent;
  let fixture: ComponentFixture<PatientDetailUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

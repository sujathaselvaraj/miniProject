import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListUpdateComponent } from './doctor-list-update.component';

describe('DoctorListUpdateComponent', () => {
  let component: DoctorListUpdateComponent;
  let fixture: ComponentFixture<DoctorListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorListUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

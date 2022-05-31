import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerlistComponent } from './volunteerlist.component';

describe('VolunteerlistComponent', () => {
  let component: VolunteerlistComponent;
  let fixture: ComponentFixture<VolunteerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

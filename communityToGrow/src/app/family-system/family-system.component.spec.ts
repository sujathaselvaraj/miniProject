import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySystemComponent } from './family-system.component';

describe('FamilySystemComponent', () => {
  let component: FamilySystemComponent;
  let fixture: ComponentFixture<FamilySystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilySystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

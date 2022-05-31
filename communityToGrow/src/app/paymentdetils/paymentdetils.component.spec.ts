import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdetilsComponent } from './paymentdetils.component';

describe('PaymentdetilsComponent', () => {
  let component: PaymentdetilsComponent;
  let fixture: ComponentFixture<PaymentdetilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentdetilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentdetilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

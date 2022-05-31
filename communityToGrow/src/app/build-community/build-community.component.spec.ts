import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildCommunityComponent } from './build-community.component';

describe('BuildCommunityComponent', () => {
  let component: BuildCommunityComponent;
  let fixture: ComponentFixture<BuildCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

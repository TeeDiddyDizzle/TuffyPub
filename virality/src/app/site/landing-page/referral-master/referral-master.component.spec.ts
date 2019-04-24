import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralMasterComponent } from './referral-master.component';

describe('ReferralMasterComponent', () => {
  let component: ReferralMasterComponent;
  let fixture: ComponentFixture<ReferralMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

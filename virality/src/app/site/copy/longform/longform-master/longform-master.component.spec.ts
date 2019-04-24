import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongformMasterComponent } from './longform-master.component';

describe('LongformMasterComponent', () => {
  let component: LongformMasterComponent;
  let fixture: ComponentFixture<LongformMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongformMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongformMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

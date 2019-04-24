import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortformMasterComponent } from './shortform-master.component';

describe('ShortformMasterComponent', () => {
  let component: ShortformMasterComponent;
  let fixture: ComponentFixture<ShortformMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortformMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortformMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenChatComponent } from './gen-chat.component';

describe('GenChatComponent', () => {
  let component: GenChatComponent;
  let fixture: ComponentFixture<GenChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPopupPage } from './alert-popup.page';

describe('AlertPopupPage', () => {
  let component: AlertPopupPage;
  let fixture: ComponentFixture<AlertPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertPopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

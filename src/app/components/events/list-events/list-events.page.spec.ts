import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventsPage } from './list-events.page';

describe('ListEventsPage', () => {
  let component: ListEventsPage;
  let fixture: ComponentFixture<ListEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

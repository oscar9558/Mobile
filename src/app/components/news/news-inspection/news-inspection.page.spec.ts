import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsInspectionPage } from './news-inspection.page';

describe('NewsInspectionPage', () => {
  let component: NewsInspectionPage;
  let fixture: ComponentFixture<NewsInspectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsInspectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsInspectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

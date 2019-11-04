import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointsPage } from './collection-points.page';

describe('CollectionPointsPage', () => {
  let component: CollectionPointsPage;
  let fixture: ComponentFixture<CollectionPointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionPointsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

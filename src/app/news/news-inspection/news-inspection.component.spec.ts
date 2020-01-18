import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsInspectionComponent } from './news-inspection.component';

describe('NewsInspectionComponent', () => {
  let component: NewsInspectionComponent;
  let fixture: ComponentFixture<NewsInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

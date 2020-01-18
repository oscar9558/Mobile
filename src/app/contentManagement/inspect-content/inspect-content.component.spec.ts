import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectContentComponent } from './inspect-content.component';

describe('InspectContentComponent', () => {
  let component: InspectContentComponent;
  let fixture: ComponentFixture<InspectContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

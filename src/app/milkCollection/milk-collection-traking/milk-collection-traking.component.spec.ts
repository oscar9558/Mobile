import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkCollectionTrakingComponent } from './milk-collection-traking.component';

describe('MilkCollectionTrakingComponent', () => {
  let component: MilkCollectionTrakingComponent;
  let fixture: ComponentFixture<MilkCollectionTrakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkCollectionTrakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCollectionTrakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterColectionComponent } from './register-colection.component';

describe('RegisterColectionComponent', () => {
  let component: RegisterColectionComponent;
  let fixture: ComponentFixture<RegisterColectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterColectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterColectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

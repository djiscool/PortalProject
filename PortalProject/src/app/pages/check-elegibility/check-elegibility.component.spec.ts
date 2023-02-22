import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckElegibilityComponent } from './check-elegibility.component';

describe('CheckElegibilityComponent', () => {
  let component: CheckElegibilityComponent;
  let fixture: ComponentFixture<CheckElegibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckElegibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckElegibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

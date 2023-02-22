import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalFaqsComponent } from './portal-faqs.component';

describe('PortalFaqsComponent', () => {
  let component: PortalFaqsComponent;
  let fixture: ComponentFixture<PortalFaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalFaqsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

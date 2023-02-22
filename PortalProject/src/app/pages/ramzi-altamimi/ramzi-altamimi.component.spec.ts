import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamziAltamimiComponent } from './ramzi-altamimi.component';

describe('RamziAltamimiComponent', () => {
  let component: RamziAltamimiComponent;
  let fixture: ComponentFixture<RamziAltamimiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamziAltamimiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamziAltamimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

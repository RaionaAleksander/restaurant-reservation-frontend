import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPlanComponent } from './floor-plan.component';

describe('FloorPlanComponent', () => {
  let component: FloorPlanComponent;
  let fixture: ComponentFixture<FloorPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloorPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorPlanComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

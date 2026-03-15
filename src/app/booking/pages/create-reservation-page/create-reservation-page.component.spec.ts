import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationPageComponent } from './create-reservation-page.component';

describe('CreateReservationPageComponent', () => {
  let component: CreateReservationPageComponent;
  let fixture: ComponentFixture<CreateReservationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReservationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReservationPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

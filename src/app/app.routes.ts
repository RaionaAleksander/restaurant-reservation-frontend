import { Routes } from '@angular/router';

import { HomeComponent } from './booking/components/home/home.component';
import { FloorPlanComponent } from './booking/components/floor-plan/floor-plan.component';
import { BookingFormComponent } from './booking/components/booking-form/booking-form.component';
import { BookingSummaryComponent } from './booking/components/booking-summary/booking-summary.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'floor-plan', component: FloorPlanComponent },
  { path: 'booking', component: BookingFormComponent },
  { path: 'summary', component: BookingSummaryComponent },
  { path: '**', redirectTo: '' }
];
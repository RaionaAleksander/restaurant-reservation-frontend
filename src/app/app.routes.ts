import { Routes } from '@angular/router';

import { SearchPageComponent } from './booking/pages/search-page/search-page.component';
import { CreateReservationPageComponent } from './booking/pages/create-reservation-page/create-reservation-page.component';

export const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent
  },
  { 
    path: 'create-reservation', 
    component: CreateReservationPageComponent 
  },
];
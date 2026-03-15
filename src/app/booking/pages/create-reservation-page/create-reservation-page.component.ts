import { Component } from '@angular/core';
import { CreateReservationFormComponent } from '../../../booking/components/create-reservation-form/create-reservation-form.component';
import { Table } from '../../../models/table.model';

@Component({
  selector: 'app-create-reservation-page',
  standalone: true,
  imports: [CreateReservationFormComponent],
  templateUrl: './create-reservation-page.component.html'
})
export class CreateReservationPageComponent {
  selectedTable: Table | null = null;
  preFilledData = {};

  onReservationSuccess() {
    alert('Reservation created!');
  }
}
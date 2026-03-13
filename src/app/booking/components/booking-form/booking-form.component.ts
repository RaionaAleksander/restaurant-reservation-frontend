import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-booking-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
})
export class BookingFormComponent {

  @Output() search = new EventEmitter<any>();

  capacity?: number;
  startTime?: string;
  endTime?: string;

  nearWindow = false;
  quietCorner = false;
  nearKidsZone = false;
  accessible = false;

  recommend = false;

  zones = [
    { value: null, label: '-' },
    { value: 'PRIVATE_ROOM', label: 'Private room' },
    { value: 'TERRACE', label: 'Terrace' },
    { value: 'MAIN_HALL', label: 'Main hall' }
  ];

  selectedZone: string | null = null;

  submit() {
    this.search.emit({
      zone: this.selectedZone,
      capacity: this.capacity,
      startTime: this.startTime,
      endTime: this.endTime,
      nearWindow: this.nearWindow,
      quietCorner: this.quietCorner,
      nearKidsZone: this.nearKidsZone,
      accessible: this.accessible,
      recommend: this.recommend
    });
  }
}

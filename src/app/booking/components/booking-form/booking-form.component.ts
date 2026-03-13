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

  submit() {
    this.search.emit({
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

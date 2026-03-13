import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableService } from '../../../core/services/table.service';
import { Table } from '../../../models/table.model';


@Component({
  selector: 'app-booking-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
})
export class BookingFormComponent {

  constructor(private tableService: TableService) {}

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
    const filters: any = {
      capacity: Number(this.capacity),
      startTime: this.startTime,
      endTime: this.endTime,
      zone: this.selectedZone,
      nearKidsZone: this.nearKidsZone,
      quietCorner: this.quietCorner,
      nearWindow: this.nearWindow,
      accessible: this.accessible,
      recommend: true
    };

    this.tableService.getTables(filters).subscribe((tables: Table[]) => {
      this.search.emit(tables);
    });
  }
}

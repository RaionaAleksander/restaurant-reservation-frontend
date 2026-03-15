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

  nearWindow: boolean = false;
  quietCorner: boolean = false;
  nearKidsZone: boolean = false;
  accessible: boolean = false;

  recommend: boolean = false;

  zones: { value: string | null; label: string }[] = [
    { value: null, label: '-' },
    { value: 'PRIVATE_ROOM', label: 'Private room' },
    { value: 'TERRACE', label: 'Terrace' },
    { value: 'MAIN_HALL', label: 'Main hall' }
  ];

  selectedZone: string | null = null;

  submit(): void {
    const filters: any = {};

    this.addFilter(filters, 'capacity', Number(this.capacity));
    this.addFilter(filters, 'startTime', this.startTime);
    this.addFilter(filters, 'endTime', this.endTime);
    this.addFilter(filters, 'zone', this.selectedZone);
    this.addFilter(filters, 'nearWindow', this.nearWindow);
    this.addFilter(filters, 'quietCorner', this.quietCorner);
    this.addFilter(filters, 'nearKidsZone', this.nearKidsZone);
    this.addFilter(filters, 'accessible', this.accessible);
    this.addFilter(filters, 'recommend', this.recommend);

    this.tableService.getTables(filters).subscribe((tables: Table[]) => {
      this.search.emit({
        tables: tables,
        recommend: this.recommend
      });
    });
  }

  addFilter(filters: any, key: string, value: any) {
    if (value !== null && value !== undefined && value !== false && value !== '') {
      filters[key] = value;
    }
  }

  isSubmitDisabled(): boolean {

    // recommendation requires capacity
    if (this.recommend && !this.capacity) {
      return true;
    }

    // time range must be complete
    if ((this.startTime && !this.endTime) || (!this.startTime && this.endTime)) {
      return true;
    }

    return false;
  }
}

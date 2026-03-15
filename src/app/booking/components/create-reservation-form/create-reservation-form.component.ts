import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService, ReservationCreateDto } from '../../../core/services/reservation.service';
import { Table } from '../../../models/table.model';

@Component({
  selector: 'app-create-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-reservation-form.component.html',
})
export class CreateReservationFormComponent {
  @Input() selectedTable!: Table | null;
  @Input() preFilledData: { startTime?: string; endTime?: string; partySize?: number } = {};
  @Output() reservationCreated = new EventEmitter<void>();

  tableId!: number;
  customerName: string = '';
  startTime: string = '';
  endTime: string = '';
  partySize: number | null = null;

  errorMessage: string = '';

  constructor(private reservationService: ReservationService) {}

  submit(): void {
    if (!this.selectedTable || !this.customerName || !this.startTime || !this.endTime || !this.partySize) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    const dto: ReservationCreateDto = {
      tableId: this.selectedTable.id,
      customerName: this.customerName,
      startTime: this.startTime,
      endTime: this.endTime,
      partySize: this.partySize,
    };

    this.reservationService.createReservation(dto).subscribe({
      next: (): void => {
        this.errorMessage = '';
        this.reservationCreated.emit();
        alert('Reservation created successfully!');
      },
      error: (err: any): void => {
        this.errorMessage = err.error?.message || 'Error creating reservation.';
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ReservationService } from '../../../core/services/reservation.service';
import { Reservation } from '../../../models/reservation.model';

@Component({
  selector: 'app-reservations-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './reservations-page.component.html',
  styleUrl: './reservations-page.component.css',
})
export class ReservationsPageComponent implements OnInit {

  reservations: Reservation[] = []

  page: number = 0;
  size: number = 20;
  totalPages: number = 0;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    console.log("Reservations page loaded");
    this.loadReservations()
  }

  loadReservations() {
    this.reservationService
      .getReservations(this.page, this.size)
      .subscribe({
        next: (data) => {
          console.log('API response:', data);
          this.reservations = data.content;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          console.error('API error:', err);
        }
      });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++
      this.loadReservations()
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--
      this.loadReservations()
    }
  }
}
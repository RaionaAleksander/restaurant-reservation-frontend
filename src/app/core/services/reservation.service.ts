import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationPage } from '../../models/reservation.model';

export interface ReservationCreateDto {
  tableId: number;
  customerName: string;
  startTime: string;
  endTime: string;
  partySize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl: string = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  createReservation(data: ReservationCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, data);
  }

  getReservations(page: number = 0, size: number = 20) {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'startTime,desc');

    return this.http.get<ReservationPage>(
      `${this.apiUrl}/reservations`,
      { params }
    );
  }
}
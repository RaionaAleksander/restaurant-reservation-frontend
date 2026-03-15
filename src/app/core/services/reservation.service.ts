import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  createReservation(data: ReservationCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, data);
  }
}
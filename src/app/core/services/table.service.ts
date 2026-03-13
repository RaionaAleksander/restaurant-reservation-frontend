import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private apiUrl = 'http://localhost:8080/api/v1/tables';

  constructor(private http: HttpClient) {}

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl);
  }

}
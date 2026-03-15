import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private apiUrl: string = 'http://localhost:8080/api/v1/tables';

  constructor(private http: HttpClient) {}

  getTables(filters?: any): Observable<Table[]> {
    let params: any = {};

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params[key] = filters[key];
        }
      });
    }

    return this.http.get<Table[]>(this.apiUrl, { params });
  }

  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl);
  }
}
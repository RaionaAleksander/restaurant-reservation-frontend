import { Component } from '@angular/core';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';
import { FloorPlanComponent } from '../../components/floor-plan/floor-plan.component';
import { Table } from '../../../models/table.model';
import { TableService } from '../../../core/services/table.service';

@Component({
  selector: 'app-search-page',
  imports: [BookingFormComponent, FloorPlanComponent],
  standalone: true,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  tables: Table[] = [];

  constructor(private tableService: TableService) {}

  search(filters: any) {
    this.tableService.getTables(filters).subscribe(data => {
      this.tables = data;
    });
  }
}

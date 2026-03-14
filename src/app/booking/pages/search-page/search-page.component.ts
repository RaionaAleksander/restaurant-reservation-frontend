import { Component } from '@angular/core';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';
import { FloorPlanComponent } from '../../components/floor-plan/floor-plan.component';
import { Table } from '../../../models/table.model';

@Component({
  selector: 'app-search-page',
  imports: [BookingFormComponent, FloorPlanComponent],
  standalone: true,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  filteredTables: Table[] = [];
  recommendMode = false;

  updateFilteredTables(data: { tables: Table[]; recommend: boolean }) {
    this.filteredTables = data.tables;
    this.recommendMode = data.recommend;

    console.log("Recommend mode:", this.recommendMode);
  }
}

import { Component } from '@angular/core';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';
import { FloorPlanComponent } from '../../components/floor-plan/floor-plan.component';
import { Table } from '../../../models/table.model';
import { TableService } from '../../../core/services/table.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [BookingFormComponent, FloorPlanComponent, CommonModule],
  standalone: true,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  filteredTables: Table[] = [];
  allTables: Table[] = [];
  recommendMode = false;

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.tableService.getAllTables().subscribe(data => {
      this.allTables = data;
    });
  }

  updateFilteredTables(data: { tables: Table[]; recommend: boolean }) {
    this.filteredTables = data.tables;
    this.recommendMode = data.recommend;

    console.log("Recommend mode:", this.recommendMode);
  }

  formatZone(zone: string): string {
    switch (zone) {
      case 'MAIN_HALL': return 'Main hall';
      case 'TERRACE': return 'Terrace';
      case 'PRIVATE_ROOM': return 'Private room';
      default: return zone;
    }
  }

  getFeatures(table: any): string {

    const features: string[] = [];

    if (table.nearWindow) features.push('Window');
    if (table.quietCorner) features.push('Quiet corner');
    if (table.nearKidsZone) features.push('Kids zone');
    if (table.accessible) features.push('Accessible');

    return features.length ? features.join(', ') : '-';
  }

  getZoneClass(zone: string): string {
    switch (zone) {
      case 'PRIVATE_ROOM': return 'bg-red-100 text-red-800';
      case 'TERRACE': return 'bg-blue-100 text-blue-800';
      case 'MAIN_HALL': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  }
}

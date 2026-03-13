import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { Table } from '../../../models/table.model';
import { CommonModule } from '@angular/common';
import { TableService } from '../../../core/services/table.service';

@Component({
  selector: 'app-floor-plan',
  standalone: true,
  templateUrl: './floor-plan.component.html',
  styleUrl: './floor-plan.component.css',
  imports: [CommonModule]
})
export class FloorPlanComponent implements OnInit {

  @Input() tables: Table[] = [];

  allTables: Table[] = [];

  scale = 1;           // zoom
  offsetX = 0;         // pan X
  offsetY = 0;         // pan Y

  isDragging = false;
  lastX = 0;
  lastY = 0;

  originalWidth = 0;
  originalHeight = 0;
  displayedWidth = 0;
  displayedHeight = 0;

  containerHeight = 0;

  @ViewChild('layoutImage') layoutImage!: ElementRef<HTMLImageElement>;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe(data => {
      this.allTables = data;
      this.updateDimensions();
    });
  }

  ngOnChanges() {
    /*if (this.tables?.length) {
      this.allTables = this.tables.map(t => ({ ...t }));
    }*/
    this.updateDimensions();
  }

  ngAfterViewInit(): void {
    const img = this.layoutImage.nativeElement;
    img.onload = () => this.updateDimensions();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateDimensions();
  }

  updateDimensions() {
    if (!this.layoutImage) return;

    const img = this.layoutImage.nativeElement;

    this.originalWidth = img.naturalWidth;
    this.originalHeight = img.naturalHeight;

    const width = img.clientWidth;

    let height = (width / this.originalWidth) * this.originalHeight;

    height = Math.min(height, width);

    this.displayedWidth = width;
    this.displayedHeight = height;
    this.containerHeight = height;
  }

  getLeft(table: Table): number {
    return table.posX * (this.displayedWidth / this.originalWidth) - 16;
  }

  getTop(table: Table): number {
    return table.posY * (this.displayedHeight / this.originalHeight) - 16;
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    this.scale = Math.max(1, Math.min(3, this.scale + delta));

    this.clampOffsets();
  }

  startDrag(event: PointerEvent) {
    event.preventDefault();

    this.isDragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;

    const target = event.target as HTMLElement;
    if (target.setPointerCapture) {
      target.setPointerCapture(event.pointerId);
    }
    
    this.mapContainer.nativeElement.style.cursor = 'grabbing';
  }

  stopDrag(event?: PointerEvent) {
    this.isDragging = false;
    this.mapContainer.nativeElement.style.cursor = 'grab';
  }

  drag(event: PointerEvent) {
    if (!this.isDragging) return;
    const dx = event.clientX - this.lastX;
    const dy = event.clientY - this.lastY;
    this.offsetX += dx;
    this.offsetY += dy;
    this.lastX = event.clientX;
    this.lastY = event.clientY;

    this.clampOffsets();
  }

  clampOffsets() {
    if (!this.mapContainer) return;

    const container = this.mapContainer.nativeElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const contentWidth = this.displayedWidth * this.scale;
    const contentHeight = this.displayedHeight * this.scale;

    const minX = Math.min(0, containerWidth - contentWidth);
    const minY = Math.min(0, containerHeight - contentHeight);

    const maxX = 0;
    const maxY = 0;

    this.offsetX = Math.min(maxX, Math.max(minX, this.offsetX));
    this.offsetY = Math.min(maxY, Math.max(minY, this.offsetY));
  }

  getZoneClass(zone: string): string {
    switch (zone) {
      case 'PRIVATE_ROOM':
        return 'bg-red-800';
      case 'TERRACE':
        return 'bg-blue-800';
      case 'MAIN_HALL':
        return 'bg-green-800';
      default:
        return 'bg-gray-500';
    }
  }
}
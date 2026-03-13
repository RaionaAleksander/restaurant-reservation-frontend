export interface Table {
  id: number;
  tableNumber: number;
  capacity: number;
  zone: string;
  posX: number;
  posY: number;
  score?: number;
}
export interface Reservation {
  id: number
  tableId: number
  tableNumber: number
  customerName: string
  partySize: number
  startTime: string
  endTime: string
  status: string
  parentReservationId?: number
}

export interface ReservationPage {
  content: Reservation[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}
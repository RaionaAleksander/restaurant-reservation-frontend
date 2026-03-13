import { TestBed } from '@angular/core/testing';

import { Table } from './table.service';

describe('Table', () => {
  let service: Table;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Table);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

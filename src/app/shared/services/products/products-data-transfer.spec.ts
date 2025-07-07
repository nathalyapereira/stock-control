import { TestBed } from '@angular/core/testing';

import { ProductsDataTransfer } from './products-data-transfer';

describe('ProductsDataTransfer', () => {
  let service: ProductsDataTransfer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDataTransfer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

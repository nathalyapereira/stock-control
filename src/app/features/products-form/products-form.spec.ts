import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsForm } from './products-form';

describe('ProductsForm', () => {
  let component: ProductsForm;
  let fixture: ComponentFixture<ProductsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

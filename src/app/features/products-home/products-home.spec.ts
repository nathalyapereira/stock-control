import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHome } from './products-home';

describe('ProductsHome', () => {
  let component: ProductsHome;
  let fixture: ComponentFixture<ProductsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

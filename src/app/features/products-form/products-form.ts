import { GetAllProductsResponse } from './../../../models/interfaces/products/response/GetAllProductsResponse';
import { ProductEvent } from '../../../models/enums/products/ProductsEvent';
import { EventProductAction } from '../../../models/interfaces/products/event/EventProductAction';
import { CreateProductRequest } from './../../../models/interfaces/products/request/CreateProductRequest';
import { GetAllCategoriesResponse } from '../../../models/interfaces/categories/response/GetAllCategoriesResponse';
import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  EventEmitter,
  Output,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from '@core/services/categories/categories';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Select } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { Products } from '@core/services/products/products';
import { DialogModule } from 'primeng/dialog';
import { EditProductRequest } from './../../../models/interfaces/products/request/EditProductRequest';
import { SaleProductResquest } from './../../../models/interfaces/products/request/SaleProductResquest';

@Component({
  selector: 'app-products-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // PrimeNG
    InputTextModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    Select,
    DialogModule,
    DividerModule
  ],
  standalone: true,
  templateUrl: './products-form.html',
  styleUrl: './products-form.scss'
})
export class ProductsForm implements OnInit, OnChanges, OnDestroy {
  // Injects
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly categoriesService = inject(Categories);
  private readonly productsService = inject(Products);

  // Properties
  private readonly destroy$ = new Subject<void>();
  @Input() displayModal = false;
  @Output() displayModalChange = new EventEmitter<boolean>();
  @Input() productEvent = {} as EventProductAction;
  @Output() getProductsDatas = new EventEmitter<void>();
  private readonly productsDatasSubject = new BehaviorSubject<GetAllProductsResponse[]>([]);
  public productsDatas$ = this.productsDatasSubject.asObservable();
  public categoriesData$!: Observable<GetAllCategoriesResponse[]>;
  public productEventDatas = {} as EventProductAction;
  public addProductForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    amount: [0, [Validators.required]]
  });
  public editProductForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    amount: [0, [Validators.required]]
  });
  public saleProductForm = this.formBuilder.group({
    product_id: ['', [Validators.required]],
    amount: [0, [Validators.required]]
  });
  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT;
  public saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;
  public visible = false;
  public loading = false;

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayModal']) {
      this.visible = changes['displayModal'].currentValue;
    }

    if (changes['productEvent']) {
      this.productEventDatas = changes['productEvent'].currentValue;
      if (this.productEventDatas.action === this.editProductAction) {
        this.getProductSelectedData();
      }

      if (this.productEventDatas.action === this.saleProductAction) {
        this.getAPIProductsData();
      }
    }
  }

  getAllCategories(): void {
    this.loading = true;
    this.categoriesData$ = this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$));
    this.loading = false;
  }

  getAPIProductsData() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatasSubject.next([...response]);
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao buscar produtos. Por favor, tente novamente mais tarde.',
            life: 3000
          });
        }
      });

    this.loading = false;
  }

  getProductSelectedData(): void {
    if (this.productEventDatas && this.productEventDatas.product?.id) {
      const { name, price, description, amount, category } = this.productEventDatas.product!;
      this.editProductForm.patchValue({
        name,
        price,
        description,
        amount,
        category_id: category.id
      });
    }
  }

  handleSubmitAddProduct(): void {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const createProductRequest = {
        name: this.addProductForm.value.name,
        price: this.addProductForm.value.price,
        description: this.addProductForm.value.description,
        category_id: this.addProductForm.value.category_id,
        amount: Number(this.addProductForm.value.amount)
      } as CreateProductRequest;

      this.productsService
        .createProduct(createProductRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto criado com sucesso!',
                life: 3000
              });
              this.getProductsDatas.emit();
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar produto!',
              life: 3000
            });
          }
        });
    }
    this.closeModal();
  }

  handleSubmitEditProduct(): void {
    if (
      this.editProductForm?.value &&
      this.editProductForm?.valid &&
      this.productEventDatas.product?.id
    ) {
      const editProductRequest = {
        name: this.editProductForm.value.name,
        price: this.editProductForm.value.price,
        product_id: this.productEventDatas.product?.id,
        description: this.editProductForm.value.description,
        amount: Number(this.editProductForm.value.amount),
        category_id: this.editProductForm.value.category_id
      } as EditProductRequest;

      this.productsService
        .editProduct(editProductRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto editado com sucesso!',
              life: 3000
            });
            this.getProductsDatas.emit();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar produto!',
              life: 3000
            });
          }
        });
    }
    this.closeModal();
  }

  handleSubmitSaleProduct() {
    if (this.saleProductForm?.value && this.saleProductForm?.valid) {
      const saleProductRequest = {
        product_id: this.saleProductForm.value.product_id,
        amount: Number(this.saleProductForm.value.amount)
      } as SaleProductResquest;

      this.productsService
        .saleProduct(saleProductRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Venda efetuada com sucesso!',
              life: 3000
            });
            this.getProductsDatas.emit();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao vender produto!',
              life: 3000
            });
          }
        });
    }
    this.closeModal();
  }

  closeModal(): void {
    this.visible = false;
    this.displayModalChange.emit(this.visible);
    this.addProductForm.reset();
    this.editProductForm.reset();
    this.saleProductForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

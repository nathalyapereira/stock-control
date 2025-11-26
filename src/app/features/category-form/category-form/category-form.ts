import { EventCategoryAction } from './../../../../models/interfaces/categories/event/EventCategoryAction';
import { CommonModule } from '@angular/common';
import { CategoryEvent } from './../../../../models/enums/categories/CategoriesEvent';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categories } from '@core/services/categories/categories';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-category-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // PrimeNG
    InputTextModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    DialogModule,
    DividerModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm implements OnChanges, OnDestroy {
  // Injects
  private readonly formBuilder = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly categoriesService = inject(Categories);

  // Properties
  public readonly destroy$ = new Subject<void>();
  @Input() displayModal = false;
  @Output() displayModalChange = new EventEmitter<boolean>();
  @Input() categoryEvent = {} as EventCategoryAction;
  @Output() getCategoriesDatas = new EventEmitter<void>();
  public categoryEventDatas = {} as EventCategoryAction;
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_EVENT;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_EVENT;
  public categoryForm = this.formBuilder.group({
    name: ['', Validators.required]
  });
  public visible = false;
  public loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayModal']) {
      this.visible = changes['displayModal'].currentValue;
    }

    if (changes['categoryEvent']) {
      this.categoryEventDatas = changes['categoryEvent'].currentValue;
      if (this.categoryEventDatas.action === this.editCategoryAction) {
        this.getCategorySelectedData();
      }
    }
  }

  handleSubmitAddCategory(): void {
    if (this.categoryForm?.value && this.categoryForm?.valid) {
      const createCategoryRequest: { name: string } = {
        name: this.categoryForm.value.name as string
      };

      this.categoriesService
        .createCategory(createCategoryRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Categoria criada com sucesso!',
                life: 3000
              });
              this.getCategoriesDatas.emit();
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar categoria!',
              life: 3000
            });
          }
        });
    }
    this.closeModal();
  }

  handleSubmitEditCategory(): void {
    if (
      this.categoryForm?.value &&
      this.categoryForm?.valid &&
      this.categoryEventDatas.category?.id
    ) {
      const editCategoryRequest: { name: string; category_id: string } = {
        name: this.categoryForm.value.name!,
        category_id: this.categoryEventDatas.category.id
      };

      this.categoriesService
        .editCategory(editCategoryRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria editada com sucesso!',
              life: 3000
            });
            this.getCategoriesDatas.emit();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar categoria!',
              life: 3000
            });
          }
        });
    }
    this.closeModal();
  }

  getCategorySelectedData(): void {
    if (this.categoryEventDatas) {
      const { name } = this.categoryEventDatas.category || {};
      this.categoryForm.patchValue({
        name
      });
    }
  }

  closeModal(): void {
    this.visible = false;
    this.displayModalChange.emit(this.visible);
    this.categoryForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

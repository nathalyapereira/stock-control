import { CategoryEvent } from './../../../models/enums/categories/CategoriesEvent';
import { EventCategoryAction } from './../../../models/interfaces/categories/event/EventCategoryAction';
import { GetAllCategoriesResponse } from '../../../models/interfaces/categories/response/GetAllCategoriesResponse';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from '@core/services/categories/categories';
import { CategoriesImports } from '@shared/categories/categories-imports';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoryForm } from '@features/category-form/category-form/category-form';

@Component({
  selector: 'app-categories-home',
  imports: [CategoriesImports.imports, CategoryForm],
  providers: [CategoriesImports.providers],
  standalone: true,
  templateUrl: './categories-home.html',
  styleUrl: './categories-home.scss'
})
export class CategoriesHome implements OnInit, OnDestroy {
  // Injects
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly categoriesService = inject(Categories);

  // Properties
  private readonly destroy$ = new Subject<void>();
  public categoriesData$!: Observable<GetAllCategoriesResponse[]>;
  public selectedCategory = {} as GetAllCategoriesResponse;
  public totalRecords = 0;
  public first = 0;
  public rows = 5;
  public loading = false;
  public metaKey = true;
  public displayModal = false;
  public categoryEventDatas = {} as EventCategoryAction;
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_EVENT;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_EVENT;

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.loading = true;
    this.categoriesData$ = this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$));
    this.categoriesData$.subscribe({
      next: (response) => {
        if (response.length) {
          this.totalRecords = response.length;
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao buscar categorias. Por favor, tente novamente mais tarde.',
          life: 3000
        });
        this.router.navigate(['/dashboard']);
      }
    });
    this.loading = false;
  }

  handleCategoryEvent(action: string, category?: GetAllCategoriesResponse): void {
    if (action && action !== '') {
      this.categoryEventDatas = category && category.id !== '' ? { action, category } : { action };
      this.displayModal = true;
    }
  }

  handleDeleteCategory(category_id: string, categoryName: string) {
    if (category_id !== '' && categoryName !== '') {
      this.confirmationService.confirm({
        message: `Tem certeza que quer remover essa categoria ${categoryName}?`,
        header: 'Confirmação',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Não',
          severity: 'secondary',
          outlined: true
        },
        acceptButtonProps: {
          label: 'Sim'
        },
        accept: () => {
          this.deleteCategory(category_id);
        }
      });
    }
  }

  deleteCategory(category_id: string) {
    if (category_id) {
      this.categoriesService
        .deleteCategory(category_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.getAllCategories();

            this.messageService.add({
              severity: 'sucess',
              summary: 'Sucesso',
              detail: 'Categoria removida com sucesso!',
              life: 3000
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover categoria.',
              life: 3000
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

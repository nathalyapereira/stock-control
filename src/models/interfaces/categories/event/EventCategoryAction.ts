import { GetAllCategoriesResponse } from './../response/GetAllCategoriesResponse';
export interface EventCategoryAction {
  action: string;
  id?: string;
  category?: GetAllCategoriesResponse;
}

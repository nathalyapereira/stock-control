import { GetAllProductsResponse } from '../response/GetAllProductsResponse';
export interface EventProductAction {
  action: string;
  product?: GetAllProductsResponse;
}

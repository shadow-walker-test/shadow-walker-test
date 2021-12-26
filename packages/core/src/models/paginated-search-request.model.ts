import { PaginatedRequestModel } from './paginated-request.model';

export interface PaginatedSearchRequestModel extends PaginatedRequestModel {
  searchText: string;
  [index: string]: any;
}

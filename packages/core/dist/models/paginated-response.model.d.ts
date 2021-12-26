import { ResponseBaseModel } from './response-base.model';
export interface PaginatedResponseModel<Model> extends ResponseBaseModel {
    data: {
        result: Model[];
        pageIndex: number;
        rowCount: number;
        pageSize: number;
    };
}

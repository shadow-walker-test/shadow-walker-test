import { ResponseBaseModel } from './response-base.model';
export interface ResponseModel<Model> extends ResponseBaseModel {
    data: Model;
}

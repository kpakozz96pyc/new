import {Product} from "../models/product";
import {ICatalogApi} from "./api/catalog-api";
import {from, Observable} from "rxjs";

export interface ICatalogService {
    getPage(size: number, skip?: number): Observable<Product[]>
}

export class CatalogService implements ICatalogService {
    constructor(private readonly api: ICatalogApi) {
    }

    getPage(pageSize: number, pageNumber?: number): Observable<Product[]> {
        return from(this.api.getPage(pageSize, pageNumber));
    }
}
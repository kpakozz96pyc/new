import {Product} from "../../models/product";
import {HttpClient} from "./http-client";

export interface ICatalogApi {
    getPage(size: number, skip?: number): Promise<Product[]>
}

export class CatalogApi implements  ICatalogApi{
    constructor(private readonly httpClient: HttpClient){}

    getPage(pageSize: number, pageNumber?: number): Promise<Product[]> {
        return this.httpClient.get<Product[]>('/product/GetPage', {pageNumber: pageNumber, pageSize: pageSize}).then()
    }
}
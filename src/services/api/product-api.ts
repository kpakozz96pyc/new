import {Product} from "../../models/product";
import {HttpClient} from "./http-client";

export interface IProductApi {
    getProduct(id:string): Promise<Product>
    updateProduct(form:FormData): Promise<string>
}

export class ProductApi implements  IProductApi{
    constructor(private readonly httpClient: HttpClient){}

    getProduct(id: string): Promise<Product> {
        return this.httpClient.get<Product>('/product/GetProduct', {productId: id}).then()
    }

    updateProduct(form: FormData): Promise<string> {
        return this.httpClient.postForm<string>(
            '/product/updateProduct',
            form
        ).then()
    }
}
import {ICatalogApi} from "./api/catalog-api";
import {ICatalogService} from "./catalog-service";
import {IAuthenticationService} from "./authentication-service";
import {ILocalStorageService} from "./localStorage";
import {HttpClient} from "./api/http-client";
import {IProductApi} from "./api/product-api";
import {IProductService} from "./product-service";

export interface Services {
    catalogApi: ICatalogApi,
    productApi: IProductApi,
    productService: IProductService,
    catalogService: ICatalogService,
    authentication: IAuthenticationService,
    localStorageService: ILocalStorageService,
    httpClient: HttpClient
}
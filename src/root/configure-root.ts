import { Store, createStore, applyMiddleware } from "redux";
import {RootAction, rootReducer, RootState} from "./root";
import {CatalogApi} from "../services/api/catalog-api";
import {CatalogService} from "../services/catalog-service";
import {Services} from "../services/services";
import {createEpicMiddleware} from "redux-observable";
import {rootEpics} from "../epics/epics";
import {AuthenticationService} from "../services/authentication-service";
import {AuthenticationApi} from "../services/api/authentication-api";
import {HttpClient} from "../services/api/http-client";
import {LocalStorage} from "../services/localStorage";
import {Actions} from "../store/actions";
import {ProductApi} from "../services/api/product-api";
import {ProductService} from "../services/product-service";
import {of} from "rxjs";

export interface RootConfig {
    store: Store<RootState, RootAction>;
}


export async function configureRoot(): Promise<RootConfig> {

    const endpoint = await getConfig();
    const httpClient = new HttpClient(endpoint);

    const catalogApi = new CatalogApi(httpClient);
    const catalogService = new CatalogService(catalogApi);

    const productApi = new ProductApi(httpClient);
    const productService = new ProductService(productApi);

    const authApi = new AuthenticationApi(httpClient);
    const authService = new AuthenticationService(authApi, httpClient);

    const localStorageService = new LocalStorage();

    const epicMiddleware = createEpicMiddleware<
        RootAction,
        RootAction,
        RootState,
        Services
        >({
        dependencies: {
            catalogService: catalogService,
            catalogApi: catalogApi,
            productApi: productApi,
            productService: productService,
            authentication: authService,
            localStorageService: localStorageService,
            httpClient: httpClient
        },
    });

    const store = createStore<RootState, RootAction, unknown, unknown>(
        rootReducer(),
        {  },
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(rootEpics());

    const user = localStorageService.getUser();
    if(user != null && user.token) {
        store.dispatch(Actions.user.login.success(user));
    }

    return { store };
}

function getConfig(): Promise<string> {
    return  of("http://kpakozz96pyc.xyz:90//").toPromise();
}

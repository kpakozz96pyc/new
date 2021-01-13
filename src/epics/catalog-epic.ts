import {RootEpic} from "./root-epic";
import {catchError, filter, map, switchMap} from "rxjs/operators";
import {isActionOf} from "typesafe-actions";
import {Actions} from "../store/actions";
import {of} from "rxjs";

const loadCatalogEpic: RootEpic = (action$, _, {catalogService}) =>
    action$.pipe(
        filter(isActionOf(Actions.catalog.loadCatalog.request)),
        switchMap(() => {
                return catalogService.getPage(10, 0).pipe(
                    map(page => {

                        return Actions.catalog.loadCatalog.success(page)
                    }),
                    catchError(x => of(Actions.catalog.loadCatalog.failure(x)))
                );
            }
        )
    );

const productPageOpenedEpic: RootEpic = (action$, _) =>
    action$.pipe(
        filter(isActionOf(Actions.catalog.productPageOpened)),
        switchMap((action) => of(Actions.catalog.loadProduct.request({id: action.payload.id})))
    );

const loadProductEpic: RootEpic = (action$, _, {productService}) =>
    action$.pipe(
        filter(isActionOf(Actions.catalog.loadProduct.request)),
        switchMap((action) => {
            return productService.getProduct(action.payload.id).pipe(map((p) => {
                    return Actions.catalog.loadProduct.success(p);
                }),
                catchError(x => of(Actions.catalog.loadCatalog.failure(x)))
            )
        }));

const productUpdateEpic: RootEpic = (action$, _, {productService}) =>
    action$.pipe(
        filter(isActionOf(Actions.catalog.updateProduct.request)),
        switchMap((action) => {
            return productService.updateProduct(action.payload.form).pipe(map((id) => {
                    return Actions.catalog.updateProduct.success({id});
                }),
                catchError(x => of(Actions.catalog.updateProduct.failure(x)))
            )
        }));

export const catalogEpics = [
    loadCatalogEpic,
    productPageOpenedEpic,
    loadProductEpic,
    productUpdateEpic
];
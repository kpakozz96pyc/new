import {createReducer} from "typesafe-actions";
import {Product} from "../models/product";
import {Actions} from "./actions";
import {combineReducers} from "redux";

const productList = createReducer<Product[]>([])
    .handleAction(Actions.catalog.loadCatalog.success, (state: any, action: any) => {
        return action.payload
    });

const currentProduct = createReducer<Product| null>(null)
    .handleAction(Actions.catalog.loadProduct.success, (state: any, action: any) => {
        return action.payload
    });

export const catalogReducer = () =>
    combineReducers({
        productList,
        currentProduct
    });
import {RootState} from "../root/root";

export const productListSelector = (state: RootState) => state.catalog.productList;

export const currentProductSelector = (state: RootState) => state.catalog.currentProduct;

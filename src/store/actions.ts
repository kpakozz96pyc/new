import {createAction, createAsyncAction, createCustomAction} from "typesafe-actions";
import {Product} from "../models/product";
import {User} from "../models/user";

const loadCatalog = createAsyncAction(
    '@@catalog/request',
    '@@catalog/success',
    '@@catalog/failure'
)<{ size: number, skip?: number }, Product[], Error>();

const loadProduct = createAsyncAction(
    '@@load-product/request',
    '@@load-product/success',
    '@@load-product/failure'
)<{ id: string }, Product, Error>();

const selectProduct = createAction('@@select-product')<Product>();

const productPageOpened = createAction('@@product-page-opened')<{ id: string }>();

const createProduct = createAction('@@create-product')();

const login = createAsyncAction(
    '@@login/request',
    '@@login/success',
    '@@login/failure'
)<{ login: string, password: string }, User, Error>();

const updateProduct = createAsyncAction(
    '@@update-product/request',
    '@@update-product/success',
    '@@update-product/failure'
)<{ form: FormData }, {id: string}, Error>();

const logout = createCustomAction('@@logout');

export const Actions = {
    catalog: {
        loadCatalog,
        selectProduct,
        createProduct,
        productPageOpened,
        loadProduct,
        updateProduct
    },
    user: {
        login,
        logout
    }
};
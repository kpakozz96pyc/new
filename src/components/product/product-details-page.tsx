import React, {useEffect} from "react";
import {Product} from "../../models/product";

import {CatalogItemComponent} from "../catalog/catalog-item";
import {useSelector} from "react-redux";
import {currentProductSelector} from "../../selectors/catalog-selector";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../store/app-dispatch";
import {Actions} from "../../store/actions";
import {ProductEditComponent} from "./product-edit";

export interface ProductDetailsPageProps {
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = () => {
    const currentProduct = useSelector(currentProductSelector) as Product;
    const dispatch = useAppDispatch();
    let {id}: {id: string} = useParams();

    useEffect(() => {
        dispatch(Actions.catalog.productPageOpened({id}));
    }, [dispatch, id]);

    return (
        <>
            <h1>Edit delete add product</h1>
            <div>
                {currentProduct ? <ProductEditComponent item={currentProduct}/> : null}
            </div>
        </>
    );
};
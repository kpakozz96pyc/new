import {useSelector} from "react-redux";
import {productListSelector} from "../../selectors/catalog-selector";
import {useAppDispatch} from "../../store/app-dispatch";
import {Actions} from "../../store/actions";
import React, {useEffect} from "react";
import {Product} from "../../models/product";
import {CatalogComponent} from "../../components/catalog/catalog";

export const CatalogPage = () => {
    const list = useSelector(productListSelector) as Product[];
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(Actions.catalog.loadCatalog.request({size: 10}));
    }, [dispatch]);

    return (
        <div className="App">
            <CatalogComponent  list={list}/>
        </div>
    );
};
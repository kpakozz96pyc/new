import React from "react";
import {Product} from "../../models/product";

import styles from "./catalog-item.module.scss"
import {Link} from "react-router-dom";

export interface CatalogItemComponentProps {
    item: Product
}

export const CatalogItemComponent: React.FC<CatalogItemComponentProps> = ({item}) => {
    return (
        <>
            <div className={styles['item-block']}>
                <div>{item.displayName}</div>
                <div>{item.art}</div>
                <div>{item.description}</div>
                <div>
                    <img alt={item.displayName} src={item.img}/>
                </div>
                <Link to={`/product/${item.id}`}>{item.displayName}</Link>
            </div>
        </>
    );
};
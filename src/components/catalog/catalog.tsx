import React from "react";
import {Product} from "../../models/product";
import styles from './catalog.module.scss';
import {CatalogItemComponent} from "./catalog-item";

export interface CatalogComponentProps {
    list: Product[]
}

export const CatalogComponent: React.FC<CatalogComponentProps> = ({list}) => {
    return (
        <div className={styles['catalog-grid']}>
            {list.map((p: Product) => {
                return <CatalogItemComponent key={p.id} item={p}/>
            })}
        </div>
    );
};
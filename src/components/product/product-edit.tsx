import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {Product} from "../../models/product";

import styles from "./product-edit.module.css"
import {useAppDispatch} from "../../store/app-dispatch";
import {Actions} from "../../store/actions";

export interface ProductEditComponentProps {
    item: Product
}

export const ProductEditComponent: React.FC<ProductEditComponentProps> = ({item}) => {

    const [file, setFile] = useState(undefined);
    const [displayName, setDisplayName] = useState(item.displayName);
    const [art, setArt] = useState(item.art);
    const [description, setDescription] = useState(item.description);

    const displayNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setDisplayName(e.currentTarget.value),
        [setDisplayName]
    );

    const artChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setArt(e.currentTarget.value),
        [setArt]
    );

    const descriptionChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value),
        [setDescription]
    );


    const acceptedTypes: string[] = [
        'image/png',
        'image/jpg',
        'image/jpeg',
    ];

    const dispatch = useAppDispatch();

    const isValidFileType = (fileType: string): boolean => {
        return acceptedTypes.includes(fileType);
    };

    const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (file && !isValidFileType(file.type)) {
            alert('Only images are allowed (png or jpg)');
            return;
        }

        const formData = new FormData();
        formData.append('File', file);
        formData.append('DisplayName', displayName);
        formData.append('Art', art);
        formData.append('Description', description);
        formData.append('Id', item.id);
        dispatch(Actions.catalog.updateProduct.request({form: formData}))
    };


    return (<>
            <div className={styles['item-block']}>
                <div>{item.displayName}</div>
                <div>{item.art}</div>
                <div>{item.description}</div>
                <div>
                    <img width={300} alt={item.displayName} src={item.img}/>
                </div>
            </div>
            <div>
                <form onSubmit={handleFileUpload} className="form">
                    <div>
                        <input
                            className={styles['login-input']}
                            type="text"
                            name="login"
                            value={displayName}
                            onChange={displayNameChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            className={styles['login-input']}
                            type="text"
                            name="login"
                            value={art}
                            onChange={artChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            className={styles['login-input']}
                            type="text"
                            name="login"
                            value={description}
                            onChange={descriptionChange}
                            required
                        />
                    </div>

                    <button className="file-chooser-button" type="button">
                        Choose File
                        <input
                            className="file-input"
                            type="file"
                            name="file"
                            accept={acceptedTypes.toString()}
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    //@ts-ignore
                                    setFile(e.target.files[0])
                                }
                            }}/>
                    </button>
                    <button className="upload-button" type="submit">
                        Upload
                    </button>
                </form>
            </div>
        </>

    );

};
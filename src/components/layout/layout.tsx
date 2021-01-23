import {useSelector} from "react-redux";

import {useAppDispatch} from "../../store/app-dispatch";
import React from "react";

import styles from "./layout.module.scss";
import {isAuthenticatedSelector, userSelector} from "../../selectors/user-selector";
import {User} from "../../models/user";
import {Actions} from "../../store/actions";

export interface LayoutComponentProps {
}

export const LayoutComponent: React.FC<LayoutComponentProps> = ({children}) => {
    const user = useSelector(userSelector) as User;
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(Actions.user.logout());
    };

    return (
        <>
            <div className={styles.header}>
                <div className={styles.userName}>{user?.name}</div>
                {isAuthenticated
                    ? <button className={styles['logout-button']} onClick={() => logout()}> logout </button>
                    : null
                }
            </div>
            <div className="App">
                <main>{children}</main>
            </div>
        </>
    );
};
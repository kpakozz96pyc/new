import React, {ChangeEvent, useCallback, useState} from "react";
import styles from "../../components/catalog/catalog.module.css";
import {useAppDispatch} from "../../store/app-dispatch";
import {Actions} from "../../store/actions";

export const LoginPage: React.FC = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const loginChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setLogin(e.currentTarget.value),
        [setLogin]
    );

    const passwordChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value),
        [setPassword]
    );

    const onLoginSubmit = useCallback(
        (login: string, password: string) =>
        {
            console.log('dispatch');
            return dispatch(Actions.user.login.request({ login, password }));
        },
        [dispatch]
    );

    return (<div className={styles['login-form']}>
        <div>
            <input
                className={styles['login-input']}
                type="email"
                name="login"
                value={login}
                placeholder='login'
                onChange={loginChange}
                required
            />
        </div>

        <div>
            <input
                className={styles['password-input']}
                type="password"
                name="password"
                value={password}
                placeholder='password'
                onChange={passwordChange}
                required
            />
        </div>
        <div>
            <button onClick={()=>onLoginSubmit(login, password)}>login</button>
        </div>

    </div>)

};


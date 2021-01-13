import {useSelector} from "react-redux";
import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import {LoginPage} from "../pages/login/login-page";
import {isAuthenticatedSelector} from "../selectors/user-selector";

export const LoginRouter: React.FC = () => {
    const isUserAuthenticated = useSelector(isAuthenticatedSelector);

    const location = useLocation();
    const { from } = (location.state || { from: { pathname: '/catalog' } }) as any;

    return isUserAuthenticated ? <Redirect to={from} /> : <LoginPage />;
};
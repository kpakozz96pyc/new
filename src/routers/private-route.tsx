import {useSelector} from "react-redux";
import {isAuthenticatedSelector} from "../selectors/user-selector";
import { RouteProps, Route, Redirect } from "react-router-dom";
import React from "react";

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const isUserAuthenticated = useSelector(isAuthenticatedSelector);

    return <Route {...rest} render={({ location }) =>
        isUserAuthenticated
            ? children
            : <Redirect to={{ pathname: '/login', state: { from: location } }} />
    }>
    </Route>;
};
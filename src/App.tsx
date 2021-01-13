import React from 'react';
import './App.css';
import {RootConfig} from "./root/configure-root";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {LoginRouter} from "./routers/login-router";
import {PrivateRoute} from "./routers/private-route";
import {MainRouter} from "./routers/main-router";
import {Provider} from "react-redux";

const App: React.FC<RootConfig> = ({store}) => {

    return (
        <Provider store={store}>
            <BrowserRouter basename={'/'}>
                <Switch>
                    <Route path="/login">
                        <LoginRouter/>
                    </Route>
                    <PrivateRoute>
                        <MainRouter/>
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default App;

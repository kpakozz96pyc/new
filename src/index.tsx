import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.scss';
import App from './App';
import {configureRoot} from "./root/configure-root";

const startApp = async () => {
    console.log('START APP');
    const config = await configureRoot();
    ReactDOM.render(<App store={config.store}/>, document.getElementById('root'));
};

startApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();

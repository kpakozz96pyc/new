import {createReducer} from "typesafe-actions";
import {Actions} from "./actions";
import {combineReducers} from "redux";
import {User} from "../models/user";

const isAuthenticated = createReducer(false)
    .handleAction(Actions.user.login.success, (state: any, action: any) => true)
    .handleAction(Actions.user.login.failure, (state: any, action: any) => false)
    .handleAction(Actions.user.logout, (state: any, action: any) => false);

const user = createReducer<User | null>( null)
    .handleAction(Actions.user.login.success, (state: any, action: any) => {
        return action.payload;
    })
    .handleAction(Actions.user.login.failure, (state: any, action: any) => null)
    .handleAction(Actions.user.logout, (state: any, action: any) => null);

export const userReducer = () =>
    combineReducers({
        isAuthenticated,
        user
    });
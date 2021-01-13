import {ActionType, StateType} from "typesafe-actions";
import {Actions} from "../store/actions";
import { combineReducers } from "redux";
import {catalogReducer} from "../store/catalog-reducer";
import {userReducer} from "../store/user-reducer";

export const rootReducer = () =>
    combineReducers({
        catalog: catalogReducer(),
        user: userReducer()
    });

export type RootState = StateType<ReturnType<typeof rootReducer>>;
export type RootAction = ActionType<typeof Actions>;
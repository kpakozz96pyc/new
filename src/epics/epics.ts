import {combineEpics} from "redux-observable";
import {catalogEpics} from "./catalog-epic";
import {userEpics} from "./user-epic";

export const rootEpics = () =>
    combineEpics(
        ...catalogEpics,
        ...userEpics
    );
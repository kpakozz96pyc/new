import {RootEpic} from "./root-epic";
import {catchError, filter, ignoreElements, map, switchMap, tap} from "rxjs/operators";
import {isActionOf} from "typesafe-actions";
import {Actions} from "../store/actions";
import {User} from "../models/user";
import {of} from "rxjs";

const loginEpic: RootEpic = (action$, _, {authentication, localStorageService}) =>
    action$.pipe(
        filter(isActionOf(Actions.user.login.request)),
        switchMap(x => {
                return authentication.login(x.payload.login, x.payload.password).pipe(
                    map((response) => {
                        const user = new User(response.username, response.token);
                        localStorageService.setUser(user);
                        return Actions.user.login.success(user);
                    }),
                    catchError(x=>{
                        return of(Actions.user.login.failure(x));
                    })
                )
            },
        )
    );

const logoutEpic: RootEpic = (action$, _, {localStorageService}) =>
    action$.pipe(
        filter(isActionOf(Actions.user.logout)),
        tap(() => {
            localStorageService.clearAll();
        }),
        ignoreElements()
    );

const headersEpic: RootEpic = (action$, _, {httpClient}) =>
    action$.pipe(
        filter(isActionOf(Actions.user.login.success)),
        tap(x => {
                httpClient.setAuthHeaders(x.payload.token)
            },
        ),
        ignoreElements()
    );


export const userEpics = [
    loginEpic,
    headersEpic,
    logoutEpic
];
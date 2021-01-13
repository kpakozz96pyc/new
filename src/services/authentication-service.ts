import {from, Observable} from "rxjs";
import {IAuthenticationApi} from "./api/authentication-api";
import {HttpClient} from "./api/http-client";
import {LoginResponse} from "../contracts/auth/LoginResponse";

export interface IAuthenticationService {
    login(login: string, password: string): Observable<LoginResponse>
}

export class AuthenticationService implements IAuthenticationService {
    constructor(private readonly api: IAuthenticationApi, private readonly httpClient: HttpClient) {    }

    public login(login: string, password: string): Observable<LoginResponse> {
        return from(this.api.getToken({login, password}).then((response)=>{
            return response;
        }));
    }

}
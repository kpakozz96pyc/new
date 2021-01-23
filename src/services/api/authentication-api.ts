import {HttpClient} from "./http-client";
import {LoginRequest} from "../../contracts/auth/LoginRequest";
import {LoginResponse} from "../../contracts/auth/LoginResponse";

export interface IAuthenticationApi {
    getToken(response : LoginRequest): Promise<LoginResponse>
}

export class AuthenticationApi implements IAuthenticationApi {
    constructor(private readonly httpClient: HttpClient) {
    }

    public getToken(request : LoginRequest): Promise<LoginResponse> {
        return this.httpClient.post<LoginResponse>(
            '/token',
            request,
            {'Access-Control-Allow-Origin': '*'}).then();
    }
}
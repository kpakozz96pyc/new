import axios, {AxiosInstance, AxiosResponse} from 'axios';

export class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    protected _handleError = (error: any) => Promise.reject(error);

    private _handleResponse = ({data}: AxiosResponse) => data;

    public get<ResponseType>(url: string, params: any) {
        return this.instance.get<ResponseType>(url, {params},);
    }

    public post<ResponseType>(url: string, params: any) {
        return this.instance.post<ResponseType>(url, params);
    }

    public postForm<ResponseType>(url: string, form: FormData) {
        return this.instance.post<ResponseType>(
            url,
            form,
            {headers: {'Content-Type': 'multipart/form-data'}});
    }

    public setAuthHeaders(token: string): void {
        console.log('headers', token);
        this.instance.interceptors.request.use(config => {
            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        });
    };

}
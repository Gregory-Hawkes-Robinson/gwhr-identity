import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpResult } from "./httpResult";

export class HttpClient {

    private readonly m_client: AxiosInstance;

    public constructor() {
        this.m_client = axios.create();
    }

    public isRequestLoggingEnabled: boolean = true;
    public isResponseLoggingEnabled: boolean = false;

    public async sendAsync<TResponse, TPayload>(config: AxiosRequestConfig<TPayload>): Promise<HttpResult<TResponse>> {
        try {
            //axios.interceptors.request.use(AxiosLogger.requestLogger);
            const resp: AxiosResponse = await this.m_client.request(config);
            return new HttpResult(resp.status, resp.statusText, resp.data);
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return new HttpResult(error.response.status, error.response.statusText);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                return new HttpResult(408, "Request timed out");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                return new HttpResult(0, error.message);
            }
        }
    }
}

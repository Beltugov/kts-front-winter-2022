import {ApiResponse, IApiStore, RequestParams} from "./types";
import qs from 'qs'

export default class ApiStore implements IApiStore {
    readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    private getRequestData<ReqT>(params: RequestParams<ReqT>): [string, RequestInit] {
        let url = this.baseUrl + params.endpoint;

        const req: RequestInit = {
            method: params.method,
        }

        if (params.method === "GET") {
            url += `?${qs.stringify(params.data)}`
        }

        if (params.method === "POST") {
            req.body = JSON.stringify(params.data);
        }
        return [url, req];
    }

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        return fetch(...this.getRequestData(params)).then((res:any) => {
            if (res.status === 200) {
                return {
                    success: true,
                    data: res.json(),
                    status: res.status,
                }
            } else {
                return {
                    success: false,
                    data: res.json(),
                    status: res.status,
                }
            }
        });
    }
}
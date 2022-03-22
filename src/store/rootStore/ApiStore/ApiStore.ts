import qs from "qs";

import { ApiResponse, IApiStore, RequestParams, StatusHTTP } from "./types";

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getRequestData<ReqT>(
    params: RequestParams<ReqT>
  ): [string, RequestInit] {
    let url = this.baseUrl + params.endpoint;

    const req: RequestInit = {
      method: params.method,
    };

    if (params.method === "GET") {
      url += `?${qs.stringify(params.data)}`;
    }

    if (params.method === "POST") {
      req.body = JSON.stringify(params.data);
      req.headers = {
        ...params.headers,
        "Content-type": "text/plain;charset=UTF-8",
      };
    }
    return [url, req];
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      const response = await fetch(...this.getRequestData(params));
      return {
        success: response.ok,
        data: await response.json(),
        status: response.status,
      };
    } catch (e) {
      return {
        success: false,
        data: null,
        status: StatusHTTP.UNEXPECTED_ERROR,
      };
    }
  }
}

import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  RawAxiosRequestHeaders,
} from "axios";
import {
  STORAGE,
  EReqMethod,
  APPSTATES,
  ERROR_MESSAGES,
} from "../constants/apiCalls";

type HttpServiceType = {
  url: string;
  method: EReqMethod;
  body?: any;
  baseUrlRequired?: boolean;
  header?: AxiosRequestHeaders;
  additionalHeaders?: AxiosRequestHeaders;
  params?: any;
};

export const HttpService = async (param: HttpServiceType) => {
  const {
    url,
    method,
    body = undefined,
    header,
    additionalHeaders = {},
    params,
  } = param;

  let headers: Partial<RawAxiosRequestHeaders>;
  if (header !== undefined) {
    headers = header;
  } else {
    headers = {
      "Content-type": "application/json",
      Accept: "application/json",
    };
  }

  if (additionalHeaders) {
    headers = { ...headers, ...additionalHeaders };
  }

  const axiosParams: AxiosRequestConfig = {
    method: method as string,
    url,
    data: body,
    headers: headers,
    params: params,
  };
  // console.log("Axiosss params==>>", axiosParams);

  const resp = await axios(axiosParams).catch((error: any) => {
    const errorMessage = Array.isArray(error?.response?.data)
      ? error?.response?.data
      : error?.response?.data?.message ??
        error.message ??
        ERROR_MESSAGES.GENERIC_ERROR_MESSAGE;
    return Promise.reject(errorMessage);
  });
  let apiResponse = {
    status: "",
    message: "",
    data: null,
  };
  apiResponse.status = resp.status?.toString();
  if (resp?.data) {
    apiResponse.data = resp?.data;
    apiResponse.message = resp?.data?.message;
  }
  if (resp.status >= 500) {
    apiResponse.status = APPSTATES.ERROR;
    return Promise.reject(ERROR_MESSAGES.GENERIC_ERROR_MESSAGE);
  } else if (resp.status >= 404) {
    apiResponse.status = APPSTATES.ERROR;
    return Promise.reject(ERROR_MESSAGES.SERVER_RESOURCE_NOT_FOUND);
  }
  if (resp.status >= 200 && resp.status < 300) {
    apiResponse.status = APPSTATES.SUCCESS;
  }

  return apiResponse;
};

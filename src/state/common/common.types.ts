export interface APIResponse<DataResponse> {
  data: DataResponse;
  status: string;
  message?: string;
}

export interface LoadingStateType {
  loading: boolean;
  success: boolean;
  failure: boolean;
  error: string;
}

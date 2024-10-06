import { ERROR_MESSAGES } from "../../constants/apiCalls";

export const loadingState = {
  loading: true,
  success: false,
  failure: false,
  error: "",
};
export const successState = {
  loading: false,
  success: true,
  failure: false,
  error: "",
};
export const failureState = {
  loading: false,
  success: false,
  failure: true,
  error: "",
};
export const genericFailureState = {
  loading: false,
  success: false,
  failure: true,
  error: ERROR_MESSAGES.GENERIC_ERROR_MESSAGE,
};
export const resetLoadingState = {
  loading: false,
  success: false,
  failure: false,
  error: "",
};

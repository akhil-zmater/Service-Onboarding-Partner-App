export enum EReqMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export const STORAGE = {
  REFERENCE_ID: "referenceId",
  AUTH_TOKEN: "loginToken",
  loginExpiry: "loginExpiry",
  zmaterToken: "ZMATER_TOKEN",
  sessionData: "sessionData",
  SESSION_ID: "sessionId",
  fcmToken: "fcmToken",
};

export const APPSTATES = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
};
export const ERROR_MESSAGES = {
  GENERIC_ERROR_MESSAGE: "Something Went Wrong!",
  SERVER_RESOURCE_NOT_FOUND:
    "Oops! our system's are fluctuating. Do not worry, Best minds are at work.",
  SESSION_ID: "uniqueSessionId",
  loginToken: "loginToken",
  loginExpiry: "loginExpiry",
};

export const END_POINT = "http://zmater.com/bluewheel";

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

export const END_POINT_BASE = "http://zmater.com/bluewheel";
export const LOGIN_END_POINT =
  "https://gateway-prod.thevehicle.app/internal/user/login";

export const END_POINTS = {
  postSCDetails: END_POINT_BASE + "/service/service-center",
  addVerificationDetails:
    END_POINT_BASE + "/service/service-center/verification",
  addFlexDetails: END_POINT_BASE + "/service/service-center/flex",
  addPhotoDetails: END_POINT_BASE + "/service/service-center/photography",
  addTrainingDetails: END_POINT_BASE + "/service/service-center/training",
  addOnboardingDetails: END_POINT_BASE + "/service/service-center/onboard",
  getFollowUps: END_POINT_BASE + "/service/service-center/followups",
};

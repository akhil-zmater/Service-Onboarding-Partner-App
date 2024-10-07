import * as scTypes from "./servicCenter.types";
export const scActionTypes = {
  GET_SC_DETAILS_PHONENO: "GET_SC_DETAILS_PHONENO",
  POST_SC_DETAILS: "POST_SC_DETAILS",
  ADD_VERIFICATION_DETAILS: "ADD_VERIFICATION_DETAILS",
};
export const serviceCenterActions = {
  getScDetailsByMobileNum: (payload: scTypes.GetSCDetailsByPhoneNoReqBody) => ({
    type: scActionTypes.GET_SC_DETAILS_PHONENO,
    payload,
  }),
  postSCDetails: (payload: scTypes.postSCDetailsReqBody) => ({
    type: scActionTypes.POST_SC_DETAILS,
    payload,
  }),
  addVerificationDetails: (payload: scTypes.AddVerificationDetailsPayload) => ({
    type: scActionTypes.ADD_VERIFICATION_DETAILS,
    payload,
  }),
};

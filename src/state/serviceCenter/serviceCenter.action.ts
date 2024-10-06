import * as scTypes from "./servicCenter.types";
export const scActionTypes = {
  GET_SC_DETAILS_PHONENO: "GET_SC_DETAILS_PHONENO",
};
export const serviceCenterActions = {
  getScDetailsByMobileNum: (payload: scTypes.GetSCDetailsByPhoneNoReqBody) => ({
    type: scActionTypes.GET_SC_DETAILS_PHONENO,
    payload,
  }),
};

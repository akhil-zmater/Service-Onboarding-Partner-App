import * as scTypes from "./servicCenter.types";
export const scActionTypes = {
  GET_SC_DETAILS_PHONENO: "GET_SC_DETAILS_PHONENO",
  POST_SC_DETAILS: "POST_SC_DETAILS",
  ADD_VERIFICATION_DETAILS: "ADD_VERIFICATION_DETAILS",
  ADD_FLEX_DETAILS: "ADD_FLEX_DETAILS",
  ADD_PHOTOGRAPHY_DETAILS: "ADD_PHOTOGRAPHY_DETAILS",
  POST_LOGIN_DETAILS: "POST_LOGIN_DETAILS",
  ADD_TRAINING_DETAILS: "ADD_TRAINING_DETAILS",
  ADD_ONBOARDING_DETAILS: "ADD_ONBOARDING_DETAILS",
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

  addFlexDetails: (payload: scTypes.AddFlexDetailsPayload) => ({
    type: scActionTypes.ADD_FLEX_DETAILS,
    payload,
  }),

  addPhotoGraphyDetails: (payload: scTypes.AddPhotoGraphyDetalsPayload) => ({
    type: scActionTypes.ADD_PHOTOGRAPHY_DETAILS,
    payload,
  }),

  addLoginDetails: (payload: scTypes.postLoginByDetailsBody) => ({
    type: scActionTypes.POST_LOGIN_DETAILS,
    payload,
  }),
  addTrainingDetails: (payload: scTypes.AddTrainingDetailsPayload) => ({
    type: scActionTypes.ADD_TRAINING_DETAILS,
    payload,
  }),
  addOnBoardingDetails: (payload: scTypes.AddOnboadingDetailsPayload) => ({
    type: scActionTypes.ADD_ONBOARDING_DETAILS,
    payload,
  }),
};

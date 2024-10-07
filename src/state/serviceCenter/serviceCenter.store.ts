import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as serviceCenterType from "./servicCenter.types";
import { loadingState } from "../common/common.values";
import { LoadingStateType } from "../common/common.types";
const initialState: serviceCenterType.ServiceCenterStateTypes = {
  activeSCDetails: null,
  scLoadingStates: {
    getSCDetailsLoadingState: loadingState,

    postSCDetailsLoadingState: loadingState,
    addVerificationDetailsLoadingState: loadingState,
  },
  addFollowUpDetails: {
    followUpDate: "",
    reason: "",

  },
};
const serviceCenterSlice = createSlice({
  name: "serviceCenterSlice",
  initialState,
  reducers: {

    //addVerification
    setAddVerificationDetailsLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.addVerificationDetailsLoadingState = {
        ...action.payload,
      };
    },
    setPostFollowUpDate: (state, action: PayloadAction<string>) => {
      console.log(action.payload, "date====>>>>>.");
      state.addFollowUpDetails.followUpDate = action.payload;
    },
    setPostFollowUpReason: (state, action: PayloadAction<string>) => {
      state.addFollowUpDetails.reason = action.payload;
    },
    //activeScDetails

    setActiveSCDetails: (
      state,
      action: PayloadAction<serviceCenterType.GetSCDetailsResponse>
    ) => {
      state.activeSCDetails = action.payload;
    },
    setGetSCDetailsLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.getSCDetailsLoadingState = { ...action.payload };
    },


    //post_scDeatils
    setPostSCDetailsLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.postSCDetailsLoadingState = { ...action.payload };
    },

  },
});
export const { actions: scActions, reducer: scReducer } = serviceCenterSlice;

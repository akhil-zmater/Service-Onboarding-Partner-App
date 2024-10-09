import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as serviceCenterType from "./servicCenter.types";
import { resetLoadingState } from "../common/common.values";
import { LoadingStateType } from "../common/common.types";
const initialState: serviceCenterType.ServiceCenterStateTypes = {
  activeSCDetails: null,
  addLoginDetails: null,
  getAssignedFollowupDetailsData: [],
  apiState: {
    isVisible: false,
    message: "",
  },
  scLoadingStates: {
    getSCDetailsLoadingState: resetLoadingState,
    postSCDetailsLoadingState: resetLoadingState,
    addVerificationDetailsLoadingState: resetLoadingState,
    addFlexDetailsLoadingState: resetLoadingState,
    addPhotoGrapghyDetailsLoadingState: resetLoadingState,
    postLoginDetailsLoadingState: resetLoadingState,
    addTrainingDetailsLoadingState: resetLoadingState,
    addOnBoardingDetailsLoadingState: resetLoadingState,
    getAssignedFollowUpDetailsLoadingState: resetLoadingState,
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
    //ErrorState
    setApiError: (
      state,
      action: PayloadAction<serviceCenterType.ApiErrorState>
    ) => {
      state.apiState = action.payload;
    },
    //assignedLoadingstate
    setAssignedFollowupDetailsData: (
      state,
      action: PayloadAction<serviceCenterType.getAssignedFollowupDetails[]>
    ) => {
      state.getAssignedFollowupDetailsData = action.payload;
    },
    setAssignedFollowUpLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.getAssignedFollowUpDetailsLoadingState = {
        ...action.payload,
      };
    },
    //addOnBoarding details
    setAddOnboardingDetailsLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.addOnBoardingDetailsLoadingState = {
        ...action.payload,
      };
    },
    //addTrainingDetails
    setAddTrainingDetailsLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.addTrainingDetailsLoadingState = {
        ...action.payload,
      };
    },
    //addPhotographyDetails
    setAddPhotographyDetailsLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.addPhotoGrapghyDetailsLoadingState = {
        ...action.payload,
      };
    },
    //addFlexDetails
    setAddFlexDetailsLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.addFlexDetailsLoadingState = { ...action.payload };
    },
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
    resetSCloadingStates: (state) => {
      state.scLoadingStates.getSCDetailsLoadingState = resetLoadingState;
      state.scLoadingStates.postSCDetailsLoadingState = resetLoadingState;
      state.scLoadingStates.addVerificationDetailsLoadingState =
        resetLoadingState;
      state.scLoadingStates.addFlexDetailsLoadingState = resetLoadingState;
      state.scLoadingStates.addPhotoGrapghyDetailsLoadingState =
        resetLoadingState;
      state.scLoadingStates.addTrainingDetailsLoadingState = resetLoadingState;
      state.scLoadingStates.addOnBoardingDetailsLoadingState =
        resetLoadingState;
    },

    setPostLoginDetailsLoadingState: (
      state,
      action: PayloadAction<LoadingStateType>
    ) => {
      state.scLoadingStates.postLoginDetailsLoadingState = {
        ...action.payload,
      };
    },
    setAddLoginDetails: (
      state,
      action: PayloadAction<serviceCenterType.postLoginDetailsResponse>
    ) => {
      state.addLoginDetails = action.payload;
    },
  },
});
export const { actions: scActions, reducer: scReducer } = serviceCenterSlice;

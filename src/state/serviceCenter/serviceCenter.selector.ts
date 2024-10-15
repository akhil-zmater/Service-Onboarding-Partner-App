import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { RegistrationStatusEnum } from "./servicCenter.types";

export const getActiveScDetails = (state: RootState) =>
  state.serviceCenter.activeSCDetails;
export const getSCDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.getSCDetailsLoadingState;
export const addScDetailsLOadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.postSCDetailsLoadingState;

export const getFollowUpDetails = (state: RootState) =>
  state.serviceCenter.addFollowUpDetails;
export const AddVerificationDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.addVerificationDetailsLoadingState;
export const AddFlexDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.addFlexDetailsLoadingState;
export const AddPhotoGraphyDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.addPhotoGrapghyDetailsLoadingState;
export const AddLoginDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.postLoginDetailsLoadingState;
export const AddTrainingDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.addTrainingDetailsLoadingState;
export const AddOnboadingDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.addOnBoardingDetailsLoadingState;
export const getEmployeeId = (state: RootState) =>
  state.serviceCenter.addLoginDetails?.employeeId;
export const getAssignedFollowUpDetails = (state: RootState) =>
  state.serviceCenter.getAssignedFollowupDetailsData;
export const getAssignedDetails = createSelector(
  [getAssignedFollowUpDetails],
  (getDetails) => {
    const data = getDetails.filter(
      (details) => details.status === RegistrationStatusEnum.ASSIGNED
    );
    return data;
  }
);

export const getFollowUpDetailsData = createSelector(
  [getAssignedFollowUpDetails],
  (getDetails) => {
    const data = getDetails.filter(
      (details) => details.status === RegistrationStatusEnum.FOLLOWUP
    );
    return data;
  }
);

export const isApiError = (state: RootState) => state.serviceCenter.apiState;
export const getAssignedFollowupDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.getAssignedFollowUpDetailsLoadingState;
export const getAddRegistrationDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.addRegistrationDetailsLoadingState;

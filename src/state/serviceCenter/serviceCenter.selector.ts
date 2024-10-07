import { RootState } from "..";

export const getActiveScDetails = (state: RootState) =>
  state.serviceCenter.activeSCDetails;
export const getSCDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.getSCDetailsLoadingState;

export const getFollowUpDetails = (state: RootState) =>
  state.serviceCenter.addFollowUpDetails;
export const AddVerificationDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.addVerificationDetailsLoadingState;


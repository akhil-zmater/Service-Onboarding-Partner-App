import { RootState } from "..";

export const getActiveScDetails = (state: RootState) =>
  state.serviceCenter.activeSCDetails;
export const getSCDetailsLoadingState = (state: RootState) =>
  state.serviceCenter.scLoadingStates.getSCDetailsLoadingState;

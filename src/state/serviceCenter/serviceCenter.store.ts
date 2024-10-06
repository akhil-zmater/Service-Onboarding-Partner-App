import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as serviceCenterType from "./servicCenter.types";
import { loadingState } from "../common/common.values";
import { LoadingStateType } from "../common/common.types";
const initialState: serviceCenterType.ServiceCenterStateTypes = {
  activeSCDetails: null,
  scLoadingStates: {
    getSCDetailsLoadingState: loadingState,
  },
};
const serviceCenterSlice = createSlice({
  name: "serviceCenterSlice",
  initialState,
  reducers: {
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
  },
});
export const { actions: scActions, reducer: scReducer } = serviceCenterSlice;

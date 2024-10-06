import { call, put, takeLatest } from "redux-saga/effects";
import { scActionTypes } from "./serviceCenter.action";
import { HttpService } from "../../services/https.services";
import { APPSTATES, END_POINT, EReqMethod } from "../../constants/apiCalls";
import { PayloadAction } from "@reduxjs/toolkit";
import * as scType from "./servicCenter.types";
import { APIResponse } from "../common/common.types";
import { scActions as scStoreActions } from "./serviceCenter.store";
import {
  failureState,
  loadingState,
  successState,
} from "../common/common.values";

const getSCDetails = (mobileNum: string) => {
  return HttpService({
    method: EReqMethod.GET,
    url: END_POINT + "/service/service-center/9502656884",
  });
};

function* getSCDetailsSaga(
  action: PayloadAction<scType.GetSCDetailsByPhoneNoReqBody>
) {
  console.log("hhhhh===>>", action.payload);
  const { mobileNumber } = action.payload;
  yield put(scStoreActions.setGetSCDetailsLoadingState(loadingState));

  try {
    const response: APIResponse<scType.GetSCDetailsResponse> = yield call(
      getSCDetails,
      mobileNumber
    );
    if (response.status === APPSTATES.SUCCESS) {
      yield put(scStoreActions.setActiveSCDetails(response.data));
      yield put(scStoreActions.setGetSCDetailsLoadingState(successState));
    } else {
      yield put(scStoreActions.setGetSCDetailsLoadingState(failureState));
    }
  } catch (error) {
    yield put(scStoreActions.setGetSCDetailsLoadingState(failureState));
    console.log("hhh===>>", error);
  }
}

export default function* watchServiceCenterActions() {
  yield takeLatest(scActionTypes.GET_SC_DETAILS_PHONENO, getSCDetailsSaga);
}

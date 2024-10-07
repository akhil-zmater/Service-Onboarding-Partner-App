
import { call, put, select, takeLatest } from "redux-saga/effects";

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

import {
  getActiveScDetails,
  getFollowUpDetails,
} from "./serviceCenter.selector";


const getSCDetails = (mobileNum: string) => {
  return HttpService({
    method: EReqMethod.GET,

    url: END_POINT + `/service/service-center/${mobileNum}`,

  });
};

function* getSCDetailsSaga(
  action: PayloadAction<scType.GetSCDetailsByPhoneNoReqBody>
) {

  const { mobileNumber } = action.payload;
  console.log(action.payload, "action.payloadd", mobileNumber);

  yield put(scStoreActions.setGetSCDetailsLoadingState(loadingState));

  try {
    const response: APIResponse<scType.GetSCDetailsResponse> = yield call(
      getSCDetails,
      mobileNumber
    );
    if (response.status === APPSTATES.SUCCESS) {

      console.log("resppp====>>>", response.data);

      yield put(scStoreActions.setActiveSCDetails(response.data));
      yield put(scStoreActions.setGetSCDetailsLoadingState(successState));
    } else {
      yield put(scStoreActions.setGetSCDetailsLoadingState(failureState));
    }
  } catch (error) {
    yield put(scStoreActions.setGetSCDetailsLoadingState(failureState));

    console.log("error===>>", error);
  }
}

const postSCDetails = (payload: scType.postSCDetailsPayload) => {
  return HttpService({
    method: EReqMethod.POST,
    url: "http://zmater.com/bluewheel/service/service-center",
    body: payload,
  });
};

function* postSCDetailsSaga(
  action: PayloadAction<scType.postSCDetailsReqBody>
) {
  const { registrationStatus, salesRepId, comments, subscriptionType } =
    action.payload;
  try {
    const followUpdetails: scType.postScDetailsFollowUp = yield select(
      getFollowUpDetails
    );
    const activeScDetails: scType.GetSCDetailsResponse = yield select(
      getActiveScDetails
    );
    console.log(activeScDetails, "activeSCDetails");
    yield put(scStoreActions.setPostSCDetailsLoadingState(loadingState));
    const details: scType.postSCDetailsPayload = {
      comments: comments as string,
      followup: followUpdetails,
      phoneNumber: activeScDetails.phoneNumber,
      registrationStatus,
      salesRepId,
      serviceCenterAddress: activeScDetails.serviceCenterAddress,
      serviceCenterName: activeScDetails.serviceCenterName,
      serviceCenterOwnerName: activeScDetails.serviceCenterOwnerName,
      subscriptionType,
    };

    console.log("details====>>>", details);
    const resp: APIResponse<string> = yield call(postSCDetails, details);
    if (resp.status === APPSTATES.SUCCESS) {
      const payload = {
        mobileNumber: activeScDetails.phoneNumber,
      };
      yield put({
        type: scActionTypes.GET_SC_DETAILS_PHONENO,
        payload: payload,
      });
      yield put(scStoreActions.setPostSCDetailsLoadingState(successState));
    } else {
      yield put(scStoreActions.setPostSCDetailsLoadingState(failureState));
    }
  } catch (error) {
    console.log("Error===>>", error);
    yield put(scStoreActions.setPostSCDetailsLoadingState(failureState));
  }
}

const addVerificationDetails = (body: scType.AddVerificationDetailsReqBody) => {
  return HttpService({
    method: EReqMethod.POST,
    url: "http://zmater.com/bluewheel/service/service-center/verification",
    body,
  });
};

function* addVerificationDetailsSaga(
  action: PayloadAction<scType.AddVerificationDetailsPayload>
) {
  const {
    comments,
    flexDimensions,
    flexInstallationDate,
    verificationStatus,
    verifierName,
    verifierRepId,
  } = action.payload;
  const activeScDetails: scType.GetSCDetailsResponse = yield select(
    getActiveScDetails
  );
  try {
    yield put(
      scStoreActions.setAddVerificationDetailsLoadingState(loadingState)
    );
    const details: scType.AddVerificationDetailsReqBody = {
      comments,
      flexDimensions,
      flexInstallationDate,
      phoneNumber: activeScDetails.phoneNumber,
      verificationStatus,
      verifierName,
      verifierRepId,
    };
    const resp: APIResponse<string> = yield call(
      addVerificationDetails,
      details
    );
    if (resp.status === APPSTATES.SUCCESS) {
      const payload = {
        mobileNumber: activeScDetails.phoneNumber,
      };
      yield put({
        type: scActionTypes.GET_SC_DETAILS_PHONENO,
        payload: payload,
      });
      yield put(
        scStoreActions.setAddVerificationDetailsLoadingState(successState)
      );
    } else {
      yield put(
        scStoreActions.setAddVerificationDetailsLoadingState(failureState)
      );
    }
  } catch (error) {
    console.log("error===>>>", error);

    yield put(
      scStoreActions.setAddVerificationDetailsLoadingState(failureState)
    );
  }
}
export default function* watchServiceCenterActions() {
  yield takeLatest(scActionTypes.GET_SC_DETAILS_PHONENO, getSCDetailsSaga);
  yield takeLatest(scActionTypes.POST_SC_DETAILS, postSCDetailsSaga);
  yield takeLatest(
    scActionTypes.ADD_VERIFICATION_DETAILS,
    addVerificationDetailsSaga
  );

}



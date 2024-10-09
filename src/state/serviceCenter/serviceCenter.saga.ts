import { call, put, select, takeLatest } from "redux-saga/effects";

import { scActionTypes } from "./serviceCenter.action";
import { HttpService } from "../../services/https.services";
import {
  APPSTATES,
  END_POINT_BASE,
  END_POINTS,
  EReqMethod,
} from "../../constants/apiCalls";
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
  getEmployeeId,
  getFollowUpDetails,
} from "./serviceCenter.selector";

const getSCDetails = (mobileNum: string) => {
  return HttpService({
    method: EReqMethod.GET,

    url: END_POINT_BASE + `/service/service-center/${mobileNum}`,
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
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );

    console.log("error===>>", error);
  }
}

const postSCDetails = (payload: scType.postSCDetailsPayload) => {
  return HttpService({
    method: EReqMethod.POST,
    url: END_POINTS.postSCDetails,
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
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );
    yield put(scStoreActions.setPostSCDetailsLoadingState(failureState));
  }
}
const postLoginDetails = (body: scType.postLoginByDetailsBody) => {
  return HttpService({
    method: EReqMethod.POST,
    url: "https://gateway-dev.thevehicle.app/internal/user/login",
    body,
  });
};

function* postLoginDetailsSaga(
  action: PayloadAction<scType.postLoginByDetailsBody>
) {
  console.log(action.payload, "action.payloadd");

  yield put(scStoreActions.setPostLoginDetailsLoadingState(loadingState));

  try {
    const response: APIResponse<scType.postLoginDetailsResponse> = yield call(
      postLoginDetails,
      action.payload
    );
    if (response.status === APPSTATES.SUCCESS) {
      console.log("resppp====>>>", response.data);

      yield put(scStoreActions.setAddLoginDetails(response.data));
      yield put({ type: scActionTypes.ASSIGNED_FOLLOWUP_DETAILS });
      yield put(scStoreActions.setPostLoginDetailsLoadingState(successState));
    } else {
      yield put(scStoreActions.setPostLoginDetailsLoadingState(failureState));
    }
  } catch (error) {
    console.log("error===>>", error);
    yield put(scStoreActions.setPostLoginDetailsLoadingState(failureState));
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );
  }
}

const addVerificationDetails = (body: scType.AddVerificationDetailsReqBody) => {
  return HttpService({
    method: EReqMethod.POST,
    url: END_POINTS.addVerificationDetails,
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
    isFollowUpClicked,
  } = action.payload;
  const activeScDetails: scType.GetSCDetailsResponse = yield select(
    getActiveScDetails
  );
  const followUpdetails: scType.postScDetailsFollowUp = yield select(
    getFollowUpDetails
  );
  try {
    yield put(
      scStoreActions.setAddVerificationDetailsLoadingState(loadingState)
    );
    const details: scType.AddVerificationDetailsReqBody = isFollowUpClicked
      ? {
          comments,
          phoneNumber: activeScDetails.phoneNumber,
          followup: followUpdetails,
          verificationStatus,
          verifierName,
          verifierRepId,
        }
      : verificationStatus === scType.VerificationStatusEnum.REJECTED
      ? {
          comments,
          phoneNumber: activeScDetails.phoneNumber,
          verificationStatus,
          verifierRepId,
          verifierName,
        }
      : {
          comments,
          flexDimensions,
          flexInstallationDate:
            flexInstallationDate !== "" ? flexInstallationDate : "",
          phoneNumber: activeScDetails.phoneNumber,
          verificationStatus,
          verifierName,
          verifierRepId,
        };
    console.log("details====>>>", details);
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
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );

    yield put(
      scStoreActions.setAddVerificationDetailsLoadingState(failureState)
    );
  }
}

const addFlexDetails = (body: scType.AddFlexDetailsReqBody) => {
  return HttpService({
    method: EReqMethod.POST,
    url: END_POINTS.addFlexDetails,
    body,
  });
};

function* addFlexDetailsSaga(
  action: PayloadAction<scType.AddFlexDetailsPayload>
) {
  const { comments, repId, status, isFollowUpClicked, phDate } = action.payload;
  try {
    const followUpdetails: scType.postScDetailsFollowUp = yield select(
      getFollowUpDetails
    );
    const activeScDetails: scType.GetSCDetailsResponse = yield select(
      getActiveScDetails
    );
    yield put(scStoreActions.setAddFlexDetailsLoadingState(loadingState));
    const details: scType.AddFlexDetailsReqBody = isFollowUpClicked
      ? {
          comments,
          repId,
          status,
          followup: followUpdetails,
          phoneNumber: activeScDetails.phoneNumber,
        }
      : {
          comments,
          repId,
          status,
          phoneNumber: activeScDetails.phoneNumber,
          phDate,
        };
    console.log("flexInstallationDetails====>>>", details);
    const resp: APIResponse<string> = yield call(addFlexDetails, details);
    if (resp.status === APPSTATES.SUCCESS) {
      const payload = {
        mobileNumber: activeScDetails.phoneNumber,
      };
      yield put({
        type: scActionTypes.GET_SC_DETAILS_PHONENO,
        payload: payload,
      });
      yield put(scStoreActions.setAddFlexDetailsLoadingState(successState));
    } else {
      yield put(scStoreActions.setAddFlexDetailsLoadingState(failureState));
    }
  } catch (error) {
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );
    yield put(scStoreActions.setAddFlexDetailsLoadingState(failureState));
  }
}

const addPhotoGraphyDetails = (body: scType.AddPhotoGraphyDetalsreqBody) => {
  return HttpService({
    method: EReqMethod.POST,
    url: END_POINTS.addPhotoDetails,
    body,
  });
};

function* addPhotographyDetailsSaga(
  action: PayloadAction<scType.AddPhotoGraphyDetalsPayload>
) {
  try {
    const { comments, repId, status, isFollowUpClicked, phDate } =
      action.payload;
    const followUpdetails: scType.postScDetailsFollowUp = yield select(
      getFollowUpDetails
    );
    const activeScDetails: scType.GetSCDetailsResponse = yield select(
      getActiveScDetails
    );
    yield put(
      scStoreActions.setAddPhotographyDetailsLoadingState(loadingState)
    );
    const details: scType.AddPhotoGraphyDetalsreqBody = isFollowUpClicked
      ? {
          comments,
          followup: followUpdetails,
          phoneNumber: activeScDetails.phoneNumber,
          repId,
          status,
        }
      : {
          comments,
          phoneNumber: activeScDetails.phoneNumber,
          repId,
          status,
          phDate,
        };
    console.log("photoGraphydetailss===>>>", details);
    const resp: APIResponse<string> = yield call(
      addPhotoGraphyDetails,
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
        scStoreActions.setAddPhotographyDetailsLoadingState(successState)
      );
    } else {
      yield put(
        scStoreActions.setAddPhotographyDetailsLoadingState(failureState)
      );
    }
  } catch (error) {
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );
    yield put(
      scStoreActions.setAddPhotographyDetailsLoadingState(failureState)
    );
  }
}

const addTrainingDetails = (body: scType.AddTrainingDetailsReqBody) => {
  return HttpService({
    method: EReqMethod.POST,
    url: END_POINTS.addTrainingDetails,
    body,
  });
};

function* addTrainingDetailsSaga(
  action: PayloadAction<scType.AddTrainingDetailsPayload>
) {
  try {
    const { comments, repId, status, isFollowUpClicked } = action.payload;
    const followUpdetails: scType.postScDetailsFollowUp = yield select(
      getFollowUpDetails
    );
    const activeScDetails: scType.GetSCDetailsResponse = yield select(
      getActiveScDetails
    );
    yield put(scStoreActions.setAddTrainingDetailsLoadingState(loadingState));

    const details: scType.AddTrainingDetailsReqBody = {
      comments,
      followup: isFollowUpClicked ? followUpdetails : null,
      phoneNumber: activeScDetails.phoneNumber,
      repId,
      status,
    };

    console.log("details IN Saga===>>>", details);
    const resp: APIResponse<string> = yield call(addTrainingDetails, details);
    if (resp.status === APPSTATES.SUCCESS) {
      const payload = {
        mobileNumber: activeScDetails.phoneNumber,
      };
      yield put({
        type: scActionTypes.GET_SC_DETAILS_PHONENO,
        payload: payload,
      });
      yield put(scStoreActions.setAddTrainingDetailsLoadingState(successState));
    } else {
      yield put(scStoreActions.setAddTrainingDetailsLoadingState(failureState));
    }
  } catch (error) {
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );
    yield put(scStoreActions.setAddTrainingDetailsLoadingState(failureState));
  }
}

const addOnboardingDetails = (body: scType.AddOnboadingDetailsReqBody) => {
  return HttpService({
    method: EReqMethod.POST,
    url: END_POINTS.addOnboardingDetails,
    body,
  });
};

function* addOnBoardingDetailsSaga(
  action: PayloadAction<scType.AddOnboadingDetailsPayload>
) {
  const { comments, repId, status, isFollowUpClicked } = action.payload;
  try {
    yield put(scStoreActions.setAddOnboardingDetailsLoadingState(loadingState));
    const followUpdetails: scType.postScDetailsFollowUp = yield select(
      getFollowUpDetails
    );
    const activeScDetails: scType.GetSCDetailsResponse = yield select(
      getActiveScDetails
    );
    const details: scType.AddOnboadingDetailsReqBody = {
      comments,
      followup: isFollowUpClicked ? followUpdetails : null,
      phoneNumber: activeScDetails.phoneNumber,
      repId,
      status,
    };
    console.log("onBoardingDetails====>>", details);
    const resp: APIResponse<string> = yield call(addOnboardingDetails, details);
    if (resp.status === APPSTATES.SUCCESS) {
      const payload = {
        mobileNumber: activeScDetails.phoneNumber,
      };
      yield put({
        type: scActionTypes.GET_SC_DETAILS_PHONENO,
        payload: payload,
      });
      yield put(
        scStoreActions.setAddOnboardingDetailsLoadingState(successState)
      );
    } else {
      yield put(
        scStoreActions.setAddOnboardingDetailsLoadingState(failureState)
      );
    }
  } catch (error) {
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );
    yield put(scStoreActions.setAddOnboardingDetailsLoadingState(failureState));
  }
}

const getAssignedFollowUpDetails = (empId: string) => {
  return HttpService({
    method: EReqMethod.GET,
    url: END_POINTS.getFollowUps + `/${empId}`,
  });
};

function* getAssignedFollowUpDetailsSaga() {
  try {
    yield put(scStoreActions.setAssignedFollowUpLoadingState(loadingState));
    //TODO: Need to change
    const empId: string = yield select(getEmployeeId);
    const resp: APIResponse<Array<scType.getAssignedFollowupDetails>> =
      yield call(getAssignedFollowUpDetails, empId);
    if (resp.status === APPSTATES.SUCCESS) {
      yield put(scStoreActions.setAssignedFollowupDetailsData(resp.data));
      yield put(scStoreActions.setAssignedFollowUpLoadingState(successState));
    } else {
      yield put(scStoreActions.setAssignedFollowUpLoadingState(failureState));
    }
  } catch (error) {
    yield put(
      scStoreActions.setApiError({
        isVisible: true,
        message: error as string,
      })
    );
    yield put(scStoreActions.setAssignedFollowUpLoadingState(failureState));
  }
}
export default function* watchServiceCenterActions() {
  yield takeLatest(
    scActionTypes.ASSIGNED_FOLLOWUP_DETAILS,
    getAssignedFollowUpDetailsSaga
  );
  yield takeLatest(scActionTypes.GET_SC_DETAILS_PHONENO, getSCDetailsSaga);
  yield takeLatest(scActionTypes.POST_SC_DETAILS, postSCDetailsSaga);
  yield takeLatest(
    scActionTypes.ADD_VERIFICATION_DETAILS,
    addVerificationDetailsSaga
  );
  yield takeLatest(scActionTypes.ADD_FLEX_DETAILS, addFlexDetailsSaga);
  yield takeLatest(
    scActionTypes.ADD_PHOTOGRAPHY_DETAILS,
    addPhotographyDetailsSaga
  );
  yield takeLatest(scActionTypes.POST_LOGIN_DETAILS, postLoginDetailsSaga);
  yield takeLatest(scActionTypes.ADD_TRAINING_DETAILS, addTrainingDetailsSaga);
  yield takeLatest(
    scActionTypes.ADD_ONBOARDING_DETAILS,
    addOnBoardingDetailsSaga
  );
}

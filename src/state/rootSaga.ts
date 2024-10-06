import { all } from "redux-saga/effects";
import watchServiceCenterActions from "./serviceCenter/serviceCenter.saga";
export function* rootSaga() {
  yield all([watchServiceCenterActions()]);
}

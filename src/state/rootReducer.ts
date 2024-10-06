import { combineReducers } from "@reduxjs/toolkit";
import { scReducer } from "./serviceCenter/serviceCenter.store";

export const rootReducer = combineReducers({
  serviceCenter: scReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

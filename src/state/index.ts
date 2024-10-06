import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddlewere from "redux-saga";
import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const saga = createSagaMiddlewere();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});
saga.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

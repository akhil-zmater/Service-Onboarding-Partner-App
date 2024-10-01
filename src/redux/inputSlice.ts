import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InputState {
  phone: string;
  sales_rep_id: string;
  service_center_phone: string;
  service_center_name: string;
  service_center_owner: string;
  service_center_location: string;
  status: string | null;
  subscription_type: string | null;
  additional_comments: string;
  verifier_name: string;
  transaction_id: string;
  payment_status: string | null;
  verifier_comments: string;
  photographer_name: string;
  technician_name: string;
  installation_comments: string;
}

const initialState: InputState = {
  phone: "",
  sales_rep_id: "",
  service_center_name: "",
  service_center_owner: "",
  service_center_phone: "",
  service_center_location: "",
  status: null,
  subscription_type: "",
  additional_comments: "",
  verifier_name: "",
  transaction_id: "",
  payment_status: null,
  verifier_comments: "",
  photographer_name: "",
  technician_name: "",
  installation_comments: "",
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInputs: (state, action: PayloadAction<Partial<InputState>>) => {
      return { ...state, ...action.payload };
    },
    setOnboardingStatus: (
      state,
      action: PayloadAction<Partial<string | null>>
    ) => {
      state.status = action.payload;
    },
    setSubscriptionStatus: (
      state,
      action: PayloadAction<Partial<string | null>>
    ) => {
      state.subscription_type = action.payload;
    },
    setPaymentStatus: (
      state,
      action: PayloadAction<Partial<string | null>>
    ) => {
      state.status = action.payload;
    },
  },
});

export const {
  setInputs,
  setOnboardingStatus,
  setSubscriptionStatus,
  setPaymentStatus,
} = inputSlice.actions;
export default inputSlice.reducer;

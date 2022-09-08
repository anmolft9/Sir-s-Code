import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethods: [],
  selectPm: {},
};
const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setPaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    },
    setSelectedPM: (state, { payload }) => {
      state.selectPm = payload;
    },
  },
});

const { reducer, actions } = paymentMethodSlice;

export const { setPaymentMethods, setSelectedPM } = actions;

export default reducer;

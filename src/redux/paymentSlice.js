// src/redux/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  method: '', 
};
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMethod(state, action) {
      state.method = action.payload;
    },
    clearPaymentMethod(state) {
      state.method = '';
    },
  },
});
export const { setPaymentMethod, clearPaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;

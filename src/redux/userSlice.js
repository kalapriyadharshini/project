import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("userInfo") // ✅ use the correct key
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: storedUser, 
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); 
    },
    clearUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo"); 
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

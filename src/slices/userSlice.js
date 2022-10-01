import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  uid: null,
  isAuthorized: false,
  profileData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.isAuthorized = action.payload.isAuthorized;
      state.profileData = action.payload.profileData;
    },
    removeUser(state) {
      state.token = null;
      state.uid = null;
      state.isAuthorized = false;
      state.profileData = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

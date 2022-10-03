import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  uid: null,
  isAuthorized: false,
  profileData: {
    name: "Name",
    surname: "Surname",
    urlUserpic:
      "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    mobile: "0000000000",
    favourites: {},
  },
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

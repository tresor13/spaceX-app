import { createSlice } from "@reduxjs/toolkit";

/* The initial state should reflect the structure of the expected state after it is loaded from the server.
The state is filled with default values ​​so the application accesses data when rendering if 
the user is new and has not yet fullfill it in on his own. So this will prevent from errors. */

/*The state consists of 2 parts - user authentication information coming from the Firebase server (uid, token, isAuthorized)
And the user profile information (ProfileData) comes from the Firestore server and is moderated by the user himself. */
const initialState = {
  token: null,
  uid: null,
  isAuthorized: false,
  profileData: {
    default: true,
    name: "Name",
    surname: "Surname",
    urlUserpic:
      "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    mobile: "0000000000",
    favourites: {}, //favourite Dragons
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

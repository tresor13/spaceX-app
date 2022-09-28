import { configureStore } from "@reduxjs/toolkit";
import rocketsReducer from "./rocketsSlice.js";
import userReducer from "./userSlice.js";

export default configureStore({
  reducer: {
    rocketsReducer,
    userReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import rocketsReducer from "./rocketsSlice.js";

export default configureStore({
  reducer: {
    rocketsReducer,
  },
});
